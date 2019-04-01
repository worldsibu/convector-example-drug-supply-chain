/** Referenced from: https://github.com/ksachdeva/hyperledger-fabric-example/blob/c41fcaa352e78cbf3c7cfb210338ac0f20b8357e/src/client.ts */
import * as fs from 'fs';
import { join } from 'path';
import * as Client from 'fabric-client';
import { IEnrollmentRequest, IRegisterRequest } from 'fabric-ca-client';
import { keyStore, userCert } from './env';

export type UserParams = IRegisterRequest;
export type AdminParams = IEnrollmentRequest;

export namespace SelfGenContext {

  interface IdentityFiles {
    privateKey: string;
    signedCert: string;
  }

  export async function getClient() {
    // Check if needed
    const contextPath = join(keyStore + '/' + userCert);

    fs.readFile(contextPath, 'utf8', async function (err, data) {
      if (err) {
        console.log(`Context in ${contextPath} doesn't exist. Make sure that path resolves to your key stores folder`);
      } else {
        console.log('Context path with cryptographic materials exists');
      }
    });

  }

}
