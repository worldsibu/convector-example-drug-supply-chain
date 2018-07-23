import { Drug } from '@worldsibu/convector-example-dsc-cc-drug/src';
import { BaseStorage } from '@worldsibu/convector-core-storage';
import { CouchDBStorage } from '@worldsibu/convector-storage-couchdb';

export namespace Models {
  export async function formatDrug(drug: Drug): Promise<any> {
    /** @type {any} */
    const DrugObj = drug.toJSON();
    // ApiKeyObj.createdBy = await formatParticipant(await Participant.getOne(apkey.createdBy));
    return DrugObj;
  }
}
