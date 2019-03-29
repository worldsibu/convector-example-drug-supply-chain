import * as dotenv from 'dotenv';
dotenv.config();
const homedir = require('os').homedir();

export const drugCC = process.env.CHAINCODE || 'drug';
export const channel = process.env.CHANNEL || 'ch1';

export const keyStore = process.env.KEYSTORE || `/${homedir}/hyperledger-fabric-network/.hfc-org1`;
export const networkProfile =  process.env.NETWORKPROFILE || `/${homedir}/hyperledger-fabric-network/network-profiles/org1.network-profile.yaml`;

export const port = process.env.PORT || 10100;
export const userCert = process.env.USERCERT || 'user1';
export const orgCert = process.env.ORGCERT || 'org1';
export const couchDBView = process.env.COUCHDBVIEW || 'ch1_drug';
export const couchDBProtocol=process.env.COUCHDB_PROTOCOL || 'http';
export const couchDBHost = process.env.COUCHDB_HOST || 'localhost';
export const couchDBPort = process.env.COUCHDB_PORT || 5084;
