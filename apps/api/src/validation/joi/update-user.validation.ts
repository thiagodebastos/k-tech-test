import { baseUserSchema } from './base-user.validation';

export const updateUserSchema = baseUserSchema.options({
  abortEarly: false,
});
