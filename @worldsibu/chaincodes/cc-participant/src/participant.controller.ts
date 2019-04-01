import * as yup from 'yup';

import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core';
import { ChaincodeTx } from '@worldsibu/convector-core-chaincode';

import { Participant } from './participant.model';

@Controller('participant')
export class ParticipantController extends ConvectorController<ChaincodeTx> {

  @Invokable()
  public async register(
    @Param(yup.string())
    id: string,
    @Param(yup.string())
    name?: string
  ) {
    // Retrieve to see if exists
    const existing = await Participant.getOne(id);

    console.log(`Registering ${id} ${name} ${this.tx.identity.getMSPID()} ${this.sender}`);
    if (!existing || !existing.id) {
      let participant = new Participant();
      participant.id = id;
      participant.name = name || id;
      participant.msp = this.tx.identity.getMSPID();
      // Create a new identity
      participant.identities = [{
        fingerprint: this.sender,
        status: true
      }];

      await participant.save();
    } else {
      throw new Error('Identity exists already, please call changeIdentity fn for updates');
    }
  }

  @Invokable()
  public async get(
    @Param(yup.string())
    id: string
  ) {
    const existing = await Participant.getOne(id);
    if (!existing || !existing.id) {
      throw new Error(`No identity exists with that ID ${id}`);
    }
    return existing;
  }

  /**
   * Check if a user is the same as the identity sending a transaction
   * @param id Id of the participant to check
   * @param sender Current `this.sender`
   */
  public static async checkParticipant(
    id: string,
    sender: string
  ) {
    const participant = await Participant.getOne(id);
    if (!participant || !participant.id || !participant.identities) {
      throw new Error(`Referenced participant ${id} does not exist in the ledger`);
    }

    const currentIdentity = participant.activeIdentity();
    if (currentIdentity.fingerprint !== sender) {
      // tslint:disable-next-line:max-line-length
      throw new Error(`Participant ${id} does not match identity making the transaction ${sender}`);
    }
    return participant;
  }
}
