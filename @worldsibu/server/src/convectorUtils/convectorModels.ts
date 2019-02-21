import { BaseStorage } from '@worldsibu/convector-core-storage';
import { CouchDBStorage } from '@worldsibu/convector-storage-couchdb';
import { Transport as TransportModel, Transport } from '@worldsibu/convector-example-dsc-cc-transport';
import { Drug as DrugModel } from '@worldsibu/convector-example-dsc-cc-drug';
import { Participant as ParticipantModel } from '@worldsibu/convector-example-dsc-cc-participant';

export { Drug } from '@worldsibu/convector-example-dsc-cc-drug';
export { Transport } from '@worldsibu/convector-example-dsc-cc-transport';
export { Participant } from '@worldsibu/convector-example-dsc-cc-participant';

import { Env } from './env';

/**
 * Route to the CouchDB
 */
BaseStorage.current = new CouchDBStorage({
  host: process.env.COUCHDB_HOST,
  protocol: process.env.COUCHDB_PROTOCOL,
  port: process.env.COUCHDB_PORT
}, process.env.COUCHDBVIEW);

export namespace ModelHelpers {
  export async function formatDrug(drug: DrugModel): Promise<any> {
    const drugObj = drug.toJSON();
    (drugObj as any).holder = await formatParticipant(await Participant.getOne(drugObj.holderId));
    return drugObj;
  }
  export async function formatTransport(transport: TransportModel): Promise<any> {
    const transportObj = transport.toJSON();
    (transportObj as any).owner = await formatParticipant(await Participant.getOne(transportObj.ownerId));
    return transportObj;
  }

  export async function formatParticipant(participant: ParticipantModel): Promise<any> {
    const participantObj = participant.toJSON();
    return participantObj;
  }

  export async function getAllDrugs() {
    const channel = Env.channel;
    const cc = Env.drugCC;
    const dbName = `${channel}_${cc}`;
    const viewUrl = '_design/drugs/_view/all';

    const queryOptions = { startKey: [''], endKey: [''] };

    try {
      const result = <DrugModel[]>(await Drug.query(Drug, dbName, viewUrl, queryOptions));
      return await Promise.all(result.map(ModelHelpers.formatDrug));
    } catch (err) {
      console.log(err);
      if (err.code === 'EDOCMISSING') {
        return [];
      } else {
        throw err;
      }
    }
  }

  export async function getAllTransport() {
    const channel = Env.channel;
    const cc = Env.drugCC;
    const dbName = `${channel}_${cc}`;
    const viewUrl = '_design/transports/_view/all';

    const queryOptions = { startKey: [''], endKey: [''] };

    try {
      const result = <TransportModel[]>(await Transport.query(Transport, dbName, viewUrl, queryOptions));
      return await Promise.all(result.map(ModelHelpers.formatTransport));
    } catch (err) {
      console.log(err);
      if (err.code === 'EDOCMISSING') {
        return [];
      } else {
        throw err;
      }
    }
  }

  export async function getAllParticipants() {
    const channel = Env.channel;
    const cc = Env.drugCC;
    const dbName = `${channel}_${cc}`;
    const viewUrl = '_design/participants/_view/all';

    const queryOptions = { startKey: [''], endKey: [''] };

    try {
      const result = <ParticipantModel[]>(await Participant.query(Participant, dbName, viewUrl, queryOptions));
      return await Promise.all(result.map(formatParticipant));
    } catch (err) {
      console.log(err);
      if (err.code === 'EDOCMISSING') {
        return [];
      } else {
        throw err;
      }
    }
  }

  export const Drug = DrugModel;
  export const Transport = TransportModel;
  export const Participant = ParticipantModel;
}
