/** @module @worldsibu/convector-examples-token */
import { ConvectorModel } from '@worldsibu/convector-core-model';
import { Report } from './report.model';
export declare class Drug extends ConvectorModel<Drug> {
    readonly type: string;
    name: string;
    holder: string;
    reports: Array<Report>;
    modified: Date;
    modifiedBy: string;
    created: Date;
    createdBy: string;
}
