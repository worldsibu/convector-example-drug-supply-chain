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
import { SelfGenContext } from '../selfGenContext';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Building this adapter allows you to communicate with the
 * test env created by `convector-tool-dev-env`.
 */
export namespace DrugController {
  export async function init(): Promise<DrugControllerClient> {
    const user = process.env.USERCERT || 'user1';
    const org = process.env.ORGCERT || 'org1';

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

//ups something changed

    // adapter.client.getUserContext()
    // adapter.client.lo
    // get it dynamically
    // const privateKeyFile = fs.readdirSync(process.env.KEYSTORE + '/keystore')[0];

    // let serverCert = fs.readFileSync(path.resolve(__dirname, `/data/${process.env.ORGCERT}-ca-chain.pem`));
    // let clientKey = fs.readFileSync(path.resolve(__dirname, process.env.KEYSTORE, 'keystore', privateKeyFile));
    // let clientCert = fs.readFileSync(path.resolve(__dirname, process.env.KEYSTORE, 'signcerts', 'cert.pem'));

    // adapter.client.setTlsClientCertAndKey(Buffer.from(clientCert).toString(), Buffer.from(clientKey).toString());
    // let channel = await adapter.client.newChannel(process.env.CHANNEL);

    // adapter.channel = channel;
    // let channel = await adapter.useChannel();

    // for (let peer of channel.getPeers()) {
    //   channel.removePeer(peer);
    // }

    // let peer = adapter.client.newPeer(
    //   'grpcs://localhost:7051',
    //   {
    //     'pem': Buffer.from(serverCert).toString()
    //   }
    // );

    await adapter.init();
    return new DrugControllerClient(adapter);
  }
}
