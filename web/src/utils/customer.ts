import { CustomerProps } from '@/types/Customer';

export function createCustomer(data: CustomerProps) {
	const payload = {
		name: data.name,
		email: data.email,
		phoneNumber: data.phoneNumber,
		cpf: data.cpf,
		street: data.address.street,
		zipcode: data.address.zipcode,
		district: data.address.district,
		city: data.address.city,
		state: data.address.state,
	};

	return payload;
}

export function updateCustomer(data: CustomerProps) {
	const payload = {
		name: data.name,
		email: data.email,
		phoneNumber: data.phoneNumber,
		cpf: data.cpf,
		address: {
			street: data.address.street,
			zipcode: data.address.zipcode,
			district: data.address.district,
			city: data.address.city,
			state: data.address.state,
		},
	};

	return payload;
}
