import { baseUserSchema } from './base-user.validation';

export const createUserSchema = baseUserSchema
  .fork(['name', 'email', 'phone'], (schema) => schema.required())
  .options({
    abortEarly: false,
  });
