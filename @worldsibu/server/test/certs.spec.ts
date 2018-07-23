// tslint:disable:no-unused-expression

import { join } from 'path';
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import 'mocha';
import { Users } from '../src/utils/users';

describe('Certs', () => {
  const list = [
    { org: 'org1', user: 'user1', name: 'Manufacturer Acme', },
    { org: 'org1', user: 'user2', name: 'Manufacturer W. White' },
    { org: 'org1', user: 'user3', name: 'Manufacturer Gus' },
    { org: 'org2', user: 'user1', name: 'Springfield General Hospital' },
    { org: 'org2', user: 'user2', name: 'Arkham Asylum' },
    { org: 'org2', user: 'user3', name: 'Mercy Hospital' }];

  before(async () => {

  });

  it('should extract all the certs', async () => {
    let res = Users.GetUsers(list);
    console.log(res);
    expect(res.length).to.eq(6);
  });


});
