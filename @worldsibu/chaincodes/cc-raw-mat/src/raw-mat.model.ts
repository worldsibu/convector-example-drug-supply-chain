/** @module @worldsibu/convector-examples-token */

import * as yup from 'yup';
import {
  ConvectorModel,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Drug extends ConvectorModel<Drug> {
  @ReadOnly()
  public readonly type = 'io.worldsibu.examples.drug';

  @ReadOnly()
  @Required()
  @Validate(yup.string())
  public readonly id: string;

  @ReadOnly()
  @Required()
  @Validate(yup.string())
  public name: string;

  @ReadOnly()
  @Required()
  @Validate(yup.date())
  public symbol: string;
}
