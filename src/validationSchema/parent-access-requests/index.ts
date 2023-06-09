import * as yup from 'yup';

export const parentAccessRequestValidationSchema = yup.object().shape({
  status: yup.string().required(),
  parent_id: yup.string().nullable().required(),
  player_id: yup.string().nullable().required(),
});
