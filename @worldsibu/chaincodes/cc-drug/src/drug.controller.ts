import * as yup from 'yup';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core';
import { ChaincodeTx } from '@worldsibu/convector-core-chaincode';

import { Drug } from './drug.model';
import { ParticipantController } from '@worldsibu/convector-example-dsc-cc-participant';
import { Transport } from '@worldsibu/convector-example-dsc-cc-transport';
import { History } from '@worldsibu/convector-core';

@Controller('drug')
export class DrugController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async create(
    @Param(yup.string())
    id: string,
    @Param(yup.string())
    name: string,
    @Param(yup.string())
    owner: string,
    @Param(yup.number())
    created: number
  ) {
    const exists = await Drug.getOne(id);

    if (exists.id === id) {
      throw new Error('There is already one drug with that unique id');
    }

    let drug = new Drug(id);
    drug.name = name;
    drug.createdBy = this.sender;
    drug.modifiedBy = this.sender;
    drug.holderId = owner;

    drug.created = created;
    drug.modified = created;

    await drug.save();
  }

  @Invokable()
  public async transfer(
    @Param(yup.string())
    drugId: string,
    @Param(yup.string())
    to: string,
    @Param(yup.string())
    reportHash,
    @Param(yup.string())
    reportUrl,
    @Param(yup.string())
    transport: string,
    @Param(yup.number())
    modified: number
  ) {
    const drug = await Drug.getOne(drugId);
    // Get the current holder
    let participant = await ParticipantController.checkParticipant(
      drug.holderId, this.sender);

    // Attach the report url. Register the identities involved in the transaction
    const report = {
      url: reportUrl,
      hash: reportHash,
      from: drug.holderId,
      to: to
    };

    if (drug.reports) {
      drug.reports.push(report);
    } else {
      drug.reports = [report];
    }

    if ((await Transport.getOne(transport)).ownerId !== to) {
      throw new Error(`Tried to assign a transport that does not belong to participant ${to}`);
    }

    // Change the holder as well the transport means
    drug.transportId = transport;
    drug.holderId = to;

    // Update as modified
    drug.modifiedBy = this.sender;
    drug.modified = modified;

    await drug.save();
  }

  @Invokable()
  public async getHistory(
    @Param(yup.string())
    drugId: string
  ): Promise<History<Drug>[]> {
    let item = await Drug.getOne(drugId);
    return await item.history();
  }
}
