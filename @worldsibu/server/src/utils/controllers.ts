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
import { DrugControllerClient } from '@worldsibu/convector-example-dsc-cc-drug/dist/client';
import { FabricControllerAdapter } from '@worldsibu/convector-adapter-fabric';
import { join, resolve } from 'path';
import { Helper } from './helper';

/**
 * Building this adapter allows you to communicate with the
 * test env created by `convector-tool-dev-env`.
 */

const user = process.env.USERCERT || 'user1';
const org = process.env.ORGCERT || 'org1';

const adapter = new FabricControllerAdapter({
  txTimeout: 10000,
  user: user,
  channel: 'ch1',
  chaincode: 'drug',
  // Go to your project's root
  // for the shared crypto objects
  keyStore: resolve(__dirname, `../../../../.convector-dev-env/.hfc-${org}`),
  // This has a soft link to the root of the project
  // For production, this file will point to another folder
  networkProfile: resolve(__dirname, '../config/org1.network-profile.yaml')
});

console.log(resolve(__dirname, '../../../../.convector-dev-env/.hfc-org1'));

adapter.init();

// Inject the adapter here.
export const DrugController = new DrugControllerClient(adapter);
