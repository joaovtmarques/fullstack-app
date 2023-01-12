export interface CustomerModel {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  cpf: string;
  address: {
    id: string;
    street: string;
    district: string;
    zipcode: string;
    city: string;
    state: string;
    customerId: string;
  } | null;
}
