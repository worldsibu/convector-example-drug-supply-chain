import * as yup from 'yup';

export interface Report {
  hash: string;
  url: string;
}

export const Report = yup.object<Report>().shape({
  hash: yup.string().required(),
  url: yup.string().required()
});
