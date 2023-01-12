import Joi from 'joi';

interface UpdateCustomerRequest {
  name: string;
  email: string;
  phoneNumber: string;
  cpf: string;
  address: {
    street: string;
    district: string;
    zipcode: string;
    city: string;
    state: string;
  };
}

export const validateUpdateCustomerData = (updateCustomer: UpdateCustomerRequest) => {
  const updateCustomerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
    cpf: Joi.string().required(),
    address: Joi.object({
      street: Joi.string().required(),
      district: Joi.string().required(),
      zipcode: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
    }).required(),
  });

  return updateCustomerSchema.validate(updateCustomer);
};
