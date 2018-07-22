import { DrugModel } from '@worldsibu/convector-example-dsc-cc-drug';
import { BaseStorage } from '@worldsibu/convector-core-storage';
import { CouchDBStorage } from '@worldsibu/convector-storage-couchdb';
export * from '@worldsibu/convector-example-dsc-cc-drug';

// Inject the CouchDB storage to the models to query directly from the World State.
BaseStorage.current = new CouchDBStorage({}, 'mychannel_dsc');

export namespace Models {
  export async function formatDrug(drug: DrugModel): Promise<any> {
    /** @type {any} */
    const DrugObj = drug.toJSON();
    // ApiKeyObj.createdBy = await formatParticipant(await Participant.getOne(apkey.createdBy));
    return DrugObj;
  }
}
