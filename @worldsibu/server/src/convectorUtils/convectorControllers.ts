/**
 * This file is in charge of building a controller (or set of controllers made up)
 * of the baseline logic you designed on your chaincode project, but replacing the logic
 * with your own for NodeJS. We inject here the `convector-adapter-fabric` which calls
 * the blockchain based on your own configuration.
 */

/** The client is the component in charge of bringing the "interface" of your business
 * logic right from the chaincode project.
 * Implementation will depend on this layer. In this case, what we want to do at this layer
 * is to call the backend peers.
 */
import { resolve } from 'path';
import { FabricControllerAdapter } from '@worldsibu/convector-adapter-fabric';
import { DrugControllerClient } from '@worldsibu/convector-example-dsc-cc-drug/dist/client';
import { TransportControllerClient } from '@worldsibu/convector-example-dsc-cc-transport/dist/client';
import { ParticipantControllerClient, Participant } from '@worldsibu/convector-example-dsc-cc-participant/dist/client';
import { SelfGenContext } from './selfGenContext';
import { ModelHelpers } from './convectorModels';

const user = process.env.USERCERT || 'user1';
const org = process.env.ORGCERT || 'org1';

async function InitFabricController() {
  await SelfGenContext.getClient();

  const adapter = new FabricControllerAdapter({
    txTimeout: 300000,
    user: user,
    // set it later to enable Mutual TLS
    channel: process.env.CHANNEL,
    chaincode: process.env.CHAINCODE,
    keyStore: resolve(__dirname, process.env.KEYSTORE),
    networkProfile: resolve(__dirname, process.env.NETWORKPROFILE),
    userMspPath: process.env.KEYSTORE
  });

  await adapter.init();
  return adapter;
}
/**
 * Building this adapter allows you to communicate with the
 * test env created by `hurley`.
 */
export async function InitDrugController(): Promise<DrugControllerClient> {
  return new DrugControllerClient(await InitFabricController());
}
export async function InitTransportController(): Promise<TransportControllerClient> {
  return new TransportControllerClient(await InitFabricController());
}
export async function InitParticipantController(): Promise<ParticipantControllerClient> {
  return new ParticipantControllerClient(await InitFabricController());
}
export async function InitServerIdentity() {
  const users = await ModelHelpers.getAllParticipants();
  if (!users.find(u => u.id === user && u.msp === `${org}MSP`)) {
    console.log('Need to register server identity');
    (await InitParticipantController()).register(user);
    console.log('Server identity registered');
  } else {
    console.log('Server identity found');
  }
}
