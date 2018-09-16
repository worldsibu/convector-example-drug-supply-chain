import * as yup from 'yup';
import {
  ConvectorModel,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Participant extends ConvectorModel<Participant> {
  @ReadOnly()
  public readonly type = 'io.worldsibu.examples.participant';

  @ReadOnly()
  @Required()
  @Validate(yup.string())
  public user: string;

  @ReadOnly()
  @Required()
  @Validate(yup.string())
  public organization: string;

  @ReadOnly()
  @Required()
  @Validate(yup.number())
  /** Unmodifiable date of creation. Default will be the date when created the object. */
  public created: number;
}
