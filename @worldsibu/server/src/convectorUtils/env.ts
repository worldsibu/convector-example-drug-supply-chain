const homedir = require('os').homedir();

/** Ref to the CC name */
export const drugCC = process.env.CHAINCODE;
/** Ref to the preferred channel name.
 * In real life application this may be dynamic.
 */
export const channel = process.env.CHANNEL;

export const keyStore = process.env.KEYSTORE || `/${homedir}/hyperledger-fabric-network/.hfc-org1`;
export const networkProfile =  process.env.NETWORKPROFILE || `/${homedir}/hyperledger-fabric-network/network-profiles/org1.network-profile.yaml`;
