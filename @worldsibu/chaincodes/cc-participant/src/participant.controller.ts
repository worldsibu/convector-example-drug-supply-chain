import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core-controller';

import { Participant } from './participant.model';

@Controller('participant')
export class ParticipantController extends ConvectorController {
  @Invokable()
  public async register(
    @Param(Participant)
    participant: Participant
  ) {
    participant.id = this.sender;
    participant.save();
  }
}
