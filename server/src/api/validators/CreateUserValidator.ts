import Joi from 'joi';

interface CreateUserRequest {
  username: string;
  password: string;
}

export const validateCreateUserData = (createUser: CreateUserRequest) => {
  const createUserSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(8).required(),
  });

  return createUserSchema.validate(createUser);
};
