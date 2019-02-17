import * as yup from 'yup';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core-controller';

import { Drug } from './drug.model';
import { Participant } from '@worldsibu/convector-example-dsc-cc-participant';

@Controller('drug')
export class DrugController extends ConvectorController {

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
    // Initialize the object!
    drug.createdBy = this.sender;
    drug.modifiedBy = this.sender;
    drug.holder = owner;

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
    @Param(yup.number())
    modified: number
  ) {
    const drug = await Drug.getOne(drugId);

    const owner = await Participant.getOne(drug.holder);

    if (!owner || !owner.id || !owner.identities) {
      throw new Error('Referenced owner participant does not exist in the ledger');
    }

    const ownerCurrentIdentity = owner.identities.find(identity => identity.status === true);

    if (ownerCurrentIdentity.fingerprint !== this.sender) {
      throw new Error(`The current holder is the only user capable of transferring the drug in the value chain. Tried ${this.sender} but expected ${ownerCurrentIdentity.fingerprint}`);
    }

    // Change the holder.
    drug.holder = to;

    // Attach the report url. Since the user is the only responsible for the attachment, we don't check anything.

    const report = {
      url: reportUrl,
      hash: reportHash
    };

    if (drug.reports) {
      drug.reports.push(report);
    } else {
      drug.reports = [report];
    }

    // Update as modified
    drug.modifiedBy = this.sender;
    drug.modified = modified;

    await drug.save();
  }
}
