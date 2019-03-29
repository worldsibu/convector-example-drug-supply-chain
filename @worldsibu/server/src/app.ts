// @ts-check

import * as express from 'express';
import { DrugCtrl } from './controllers';
import * as bodyParser from 'body-parser';
import { ParticipantCtrl } from './controllers/participant.controller';
import { TransportCtrl } from './controllers/transport.controller';
import { userCert, orgCert, keyStore, networkProfile, channel, drugCC, couchDBView, couchDBProtocol, couchDBHost, couchDBPort, port } from './convectorUtils';
import { ServerCtrl } from './controllers/server.controller';

const app: express.Application = express();

app.use(bodyParser.urlencoded({
  extended: true,
  limit: '40mb'
}));

app.use(bodyParser.json({ limit: '40mb' }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/server', ServerCtrl);
app.use('/drugs', DrugCtrl);
app.use('/transports', TransportCtrl);
app.use('/participants', ParticipantCtrl);

console.log(`PORT=${port}`);
console.log(`USERCERT=${userCert}`);
console.log(`ORGCERT=${orgCert}`);
console.log(`KEYSTORE=${keyStore}`);
console.log(`NETWORKPROFILE=${networkProfile}`);
console.log(`CHANNEL=${channel}`);
console.log(`CHAINCODE=${drugCC}`);
console.log(`COUCHDBVIEW=${couchDBView}`);
console.log(`COUCHDB_PROTOCOL=${couchDBProtocol}`);
console.log(`COUCHDB_HOST=${couchDBHost}`);
console.log(`COUCHDB_PORT=${couchDBPort}`);

app.listen(port, () =>
  console.log(`Running as ${orgCert}:${userCert} in port ${port}`));

module.exports = app;
