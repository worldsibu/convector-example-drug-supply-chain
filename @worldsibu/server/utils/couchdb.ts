import CouchDb from 'node-couchdb';
import { Helper } from './helper';

const couch = new CouchDb();

module.exports = {
  getView: (view, method, key = '', query = {}) => {
    const channel = Helper.channel;
    // _dsc is the name that you gave to your blockchain
    const dbName = channel + '_dsc';
    const queryOptions = { startKey: [key], endKey: [key] };

    // Resolve the name of the view
    const viewUrl = `_design/${view}/_view/${method}?${
      Object.keys(query).map(k => `${k}=${query[k]}`).join('&')
      }`;

    return couch.get(dbName, viewUrl, queryOptions);
  }
};
