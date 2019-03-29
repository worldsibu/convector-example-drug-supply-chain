import * as yup from 'yup';
import {
  ConvectorModel,
  ReadOnly,
  Required,
  Validate,
  Default
} from '@worldsibu/convector-core';

export class Report extends ConvectorModel<Report> {
  @ReadOnly()
  public readonly type = 'io.worldsibu.examples.report';

  @Required()
  @Validate(yup.string())
  hash: string;

  @Required()
  @Validate(yup.string())
  url: string;

  @Validate(yup.string())
  from: string;

  @Validate(yup.string())
  to: string;
}
