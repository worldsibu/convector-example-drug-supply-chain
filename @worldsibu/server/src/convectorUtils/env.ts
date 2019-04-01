import * as dotenv from 'dotenv';
import { identities } from '../identities';
dotenv.config();
const homedir = require('os').homedir();

export const drugCC = process.env.CHAINCODE || 'drug';
export const channel = process.env.CHANNEL || 'ch1';

// Automatically extract credentials by the user id
export const identity = process.env.IDENTITY || 'aa001';
export const userCert = identities.find(id => id.id === identity).certId;
export const orgCert = identities.find(id => id.id === identity).certOrg;

export const keyStore = process.env.KEYSTORE || `/${homedir}/hyperledger-fabric-network/.hfc-${orgCert}`;
export const networkProfile = process.env.NETWORKPROFILE || `/${homedir}/hyperledger-fabric-network/network-profiles/org1.network-profile.yaml`;

export const port = process.env.PORT || 10100;

export const couchDBView = process.env.COUCHDBVIEW || 'ch1_drug';
export const couchDBProtocol = process.env.COUCHDB_PROTOCOL || 'http';
export const couchDBHost = process.env.COUCHDB_HOST || 'localhost';
export const couchDBPort = process.env.COUCHDB_PORT || 5084;
