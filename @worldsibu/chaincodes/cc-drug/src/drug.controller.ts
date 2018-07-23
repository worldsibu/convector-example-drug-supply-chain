import * as yup from 'yup';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core-controller';

import { Drug } from './drug.model';

@Controller('drug')
export class DrugController extends ConvectorController {

  @Invokable()
  public async create(
    @Param(yup.string())
    id: string,
    @Param(yup.string())
    name: string
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
    drug.holder = this.sender;

    const now = new Date();
    drug.created = now;
    drug.modified = now;

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
    reportUrl
  ) {
    const drug = await Drug.getOne(drugId);

    if (drug.holder !== this.sender) {
      throw new Error('The current holder is the only user capable of transferring the drug in the value chain.');
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
    drug.modified = new Date();

    await drug.save();
  }
}
