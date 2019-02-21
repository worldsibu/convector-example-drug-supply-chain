import * as yup from 'yup';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core-controller';

import { Transport } from './transport.model';
import { ParticipantController } from '@worldsibu/convector-example-dsc-cc-participant';
import { History } from '@worldsibu/convector-core-model';
import { Company } from './company.model';

/**
 * The means to transport shipments
 */
@Controller('drug')
export class TransportController extends ConvectorController {

  @Invokable()
  public async create(
    @Param(yup.string())
    id: string,
    @Param(Company)
    company: Company,
    @Param(yup.number())
    transportType: number,
    @Param(yup.string())
    ownerId: string,
  ) {
    const exists = await Transport.getOne(id);
    if (exists.id) {
      throw new Error('There is already one transport with that unique id');
    }
    const transport = new Transport();
    transport.id = id;
    transport.company = company;
    transport.transportType = transportType;
    transport.ownerId = ownerId;

    await transport.save();
  }

  @Invokable()
  public async disable(
    @Param(yup.string())
    id: string
  ) {
    let item = await Transport.getOne(id);
    await ParticipantController.checkParticipant(item.ownerId, this.sender);
    item.active = false;
    return item.save();
  }

  @Invokable()
  public async getHistory(
    @Param(yup.string())
    id: string
  ): Promise<History<Transport>[]> {
    let item = await Transport.getOne(id);
    return await item.history();
  }
}
