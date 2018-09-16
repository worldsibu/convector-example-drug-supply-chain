import * as yup from 'yup';
import {
  ConvectorModel,
  ReadOnly,
  Required,
  Validate,
  Default
} from '@worldsibu/convector-core-model';
import { Report } from './report.model';

export class Drug extends ConvectorModel<Drug> {
  @ReadOnly()
  public readonly type = 'io.worldsibu.examples.drug';

  @ReadOnly()
  @Required()
  @Validate(yup.string())
  public name: string;

  @Required()
  @Validate(yup.string())
  /** Current user owning the drug. */
  public holder: string;

  @Validate(yup.array(Report))
  /** Current user owning the drug. */
  public reports: Array<Report>;

  @Validate(yup.number())
  /** Date in which it was modified. */
  public modified: number;

  @Required()
  @Validate(yup.string())
  /** Last user that modified it. */
  public modifiedBy: string;

  @ReadOnly()
  @Required()
  @Validate(yup.number())
  /** Unmodifiable date of creation. Default will be the date when created the object. */
  public created: number;

  @ReadOnly()
  @Required()
  @Validate(yup.string())
  /** Unmodifiable creator in the network. Default will be the cert requesting the creation in the controller. */
  public createdBy: string;
}
