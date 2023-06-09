import * as yup from 'yup';
import { parentAccessRequestValidationSchema } from 'validationSchema/parent-access-requests';

export const parentValidationSchema = yup.object().shape({
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  parent_access_request: yup.array().of(parentAccessRequestValidationSchema),
});
