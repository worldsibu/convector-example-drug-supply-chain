import { Drug } from '@worldsibu/convector-example-dsc-cc-drug';
import { BaseStorage } from '@worldsibu/convector-core-storage';
import { CouchDBStorage } from '@worldsibu/convector-storage-couchdb';

BaseStorage.current = new CouchDBStorage({
  host: process.env.COUCHDB_HOST,
  protocol: process.env.COUCHDB_PROTOCOL,
  port: process.env.COUCHDB_PORT
}, process.env.COUCHDBVIEW);

export namespace Models {
  export async function formatDrug(drug: Drug): Promise<any> {
    /** @type {any} */
    const DrugObj = drug.toJSON();
    // ApiKeyObj.createdBy = await formatParticipant(await Participant.getOne(apkey.createdBy));
    return DrugObj;
  }
}
