export interface CustomerProps {
	id?: string;
	name: string;
	email: string;
	phoneNumber: string;
	cpf: string;
	address: {
		id?: string;
		street: string;
		zipcode: string;
		district: string;
		city: string;
		state: string;
		customerId?: string;
	};
}

export interface CreateCustomerProps {
	name: string;
	email: string;
	phoneNumber: string;
	cpf: string;
	street: string;
	zipcode: string;
	district: string;
	city: string;
	state: string;
}
