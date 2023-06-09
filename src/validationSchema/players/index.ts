import * as yup from 'yup';
import { parentAccessRequestValidationSchema } from 'validationSchema/parent-access-requests';
import { playerProfileValidationSchema } from 'validationSchema/player-profiles';

export const playerValidationSchema = yup.object().shape({
  name: yup.string().required(),
  status: yup.string().required(),
  academy_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
  parent_access_request: yup.array().of(parentAccessRequestValidationSchema),
  player_profile: yup.array().of(playerProfileValidationSchema),
});
