import { api } from '@/services/api';
import { CreateCustomerProps, CustomerProps } from '@/types/Customer';
import axios from 'axios';

interface ListUsersPagination {
	page?: number;
	perPage: number;
}

export const useApi = () => ({
	login: async (username: string, password: string) => {
		const request = await api.post('/login', { username, password });

		return request.data;
	},

	register: async (username: string, password: string) => {
		const request = await api.post('/users', { username, password });
	},

	refreshToken: async (rToken: string) => {
		const request = await api.post('/refresh-token', { refreshToken: rToken });

		return request.data;
	},

	listUsers: async ({ perPage, page }: ListUsersPagination) => {
		const request = await axios.get(
			`https://randomuser.me/api/?page=${
				page || 1
			}&results=${perPage}&seed=abc`,
		);

		return request.data;
	},

	getDog: async () => {
		const request = await axios.get('https://random.dog/woof.json');

		return request.data.url;
	},

	getCustomers: async (token: string) => {
		const request = await api.get('/customers', {
			headers: { Authorization: `Bearer ${token}` },
		});

		return request.data;
	},

	createCustomer: async (data: CreateCustomerProps, token: string) => {
		const request = await api.post('/customers', data, {
			headers: { Authorization: `Bearer ${token}` },
		});

		return request.data;
	},

	updateCustomer: async (id: string, data: CustomerProps, token: string) => {
		const request = await api.put(`/customers/${id}`, data, {
			headers: { Authorization: `Bearer ${token}` },
		});

		return request.data;
	},

	deleteCustomer: async (id: string, token: string) => {
		await api.delete(`/customers/${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
	},
});
