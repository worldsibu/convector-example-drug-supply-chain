import * as yup from 'yup';
import {
  ConvectorModel,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Company extends ConvectorModel<Company> {
  @ReadOnly()
  public readonly type = 'io.worldsibu.examples.company';

  @ReadOnly()
  @Required()
  @Validate(yup.string())
  public name: string;
}
