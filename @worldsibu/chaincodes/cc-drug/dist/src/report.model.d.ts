import * as yup from 'yup';
export interface Report {
    hash: string;
    url: string;
}
export declare const Report: yup.ObjectSchema<Report>;
