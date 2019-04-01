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
import { DrugController } from '@worldsibu/convector-example-dsc-cc-drug';
import { TransportController } from '@worldsibu/convector-example-dsc-cc-transport';
import { ParticipantController, Participant } from '@worldsibu/convector-example-dsc-cc-participant';
import { SelfGenContext } from './selfGenContext';
import { ConvectorControllerClient, ClientFactory } from '@worldsibu/convector-core';
import { keyStore, networkProfile, userCert, channel, drugCC, orgCert, identity } from './env';


async function InitFabricAdapter() {
  await SelfGenContext.getClient();

  const adapter = new FabricControllerAdapter({
    txTimeout: 300000,
    user: userCert,
    // set it later to enable Mutual TLS
    channel: channel,
    chaincode: drugCC,
    keyStore: resolve(__dirname, keyStore),
    networkProfile: resolve(__dirname, networkProfile),
    userMspPath: keyStore
  });

  await adapter.init();
  return adapter;
}
/**
 * Building this adapter allows you to communicate with the
 * test env created by `hurley`.
 */
export async function InitDrugController(): Promise<ConvectorControllerClient<DrugController>> {
  return ClientFactory(DrugController, await InitFabricAdapter());
}
export async function InitTransportController(): Promise<ConvectorControllerClient<TransportController>> {
  return ClientFactory(TransportController, await InitFabricAdapter());
}
export async function InitParticipantController(): Promise<ConvectorControllerClient<ParticipantController>> {
  return ClientFactory(ParticipantController, await InitFabricAdapter());
}
export async function InitServerIdentity() {
  const res = await (await InitParticipantController()).get(identity);
  const serverIdentity = new Participant(res).toJSON();

  if (!serverIdentity || !serverIdentity.id) {
    console.log('Server identity not found, make sure to enroll it or seed data');
  } else {
    console.log('Server identity found');
  }
}
