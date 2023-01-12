import Joi from 'joi';

interface CreateCustomerRequest {
  name: string;
  email: string;
  phoneNumber: string;
  cpf: string;
  street: string;
  district: string;
  zipcode: string;
  city: string;
  state: string;
}

export const validateCreateCustomerData = (createCustomer: CreateCustomerRequest) => {
  const createCustomerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
    cpf: Joi.string().required(),
    street: Joi.string().required(),
    district: Joi.string().required(),
    zipcode: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
  });

  return createCustomerSchema.validate(createCustomer);
};
