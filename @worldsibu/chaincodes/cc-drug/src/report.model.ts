import * as yup from 'yup';

export interface Report {
  hash: string;
  url: string;
  from: string;
  to: string;
}

export const Report = yup.object<Report>().shape({
  hash: yup.string().required(),
  url: yup.string().required(),
  from: yup.string(),
  to: yup.string(),
});
