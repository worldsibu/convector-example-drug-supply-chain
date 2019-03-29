import * as yup from 'yup';
import {
  ConvectorModel,
  ReadOnly,
  Required,
  Validate,
  Default,
  FlatConvectorModel
} from '@worldsibu/convector-core';
import { Company } from './company.model';

export class Transport extends ConvectorModel<Transport> {
  @ReadOnly()
  public readonly type = 'io.worldsibu.examples.transport';

  /** For auditing reasons, regulation requires this information
   * to be embbeded instead of just referenced
   */
  @ReadOnly()
  @Required()
  @Validate(yup.string())
  public company: FlatConvectorModel<Company>;

  @ReadOnly()
  @Required()
  @Validate(yup.number())
  public transportType: number;

  @ReadOnly()
  @Required()
  @Validate(yup.string())
  public ownerId: string;

  @Required()
  @Validate(yup.boolean())
  @Default(true)
  public active: boolean;
}
