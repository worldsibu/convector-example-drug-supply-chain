// tslint:disable:no-unused-expression

import { join } from 'path';
import { expect } from 'chai';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import 'mocha';

import { Participant } from '../src/participant.model';
import { ParticipantControllerClient } from '../client';

describe('Participant', () => {
  let adapter: MockControllerAdapter;
  let participantCtrl: ParticipantControllerClient;

  // Mock certificate fingerprint
  const newUserCertificate = 'B6:0B:37:7C:DF:D2:7A:08:0B:98:BF:52:A4:2C:DC:4E:CC:70:91:BH';

  before(async () => {
    // Mocks the blockchain execution environment
    adapter = new MockControllerAdapter();
    participantCtrl = new ParticipantControllerClient(adapter);

    await adapter.init([
      {
        version: '*',
        controller: 'ParticipantController',
        name: join(__dirname, '..')
      }
    ]);

  });

  it('should register a participant', async () => {
    await participantCtrl.register(new Participant({
      name: 'Test',
      created: Date.now()
    }));

    const part = await adapter.getById<Participant>(newUserCertificate);

    expect(part.name).to.eq('Test');
  });
});
