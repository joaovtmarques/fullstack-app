import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useLocation, useNavigate } from 'react-router-dom';

import { useApi, useAuth } from '@/hooks';

import { CustomerProps } from '@/types/Customer';

import {
	BottomTabs,
	Container,
	Header,
	LogoutButton,
	Menu,
	CustomerItem,
	CustomerForm,
	CustomerFormButton,
	Button,
} from '@/components';

import logoImg from '@/assets/logo.svg';
import { DialogPrimitive, DialogTrigger } from '@/components/CustomerForm';

export function Customer() {
	const api = useApi();
	const auth = useAuth();
	const location = useLocation();
	const navigate = useNavigate();

	const [customers, setCustomers] = useState<CustomerProps[]>([]);

	async function handleGetCustomers() {
		const customers = await api.getCustomers(auth.token!);

		setCustomers(customers.slice(0).reverse());
	}

	useEffect(() => {
		handleGetCustomers();
	}, [customers]);

	return (
		<>
			<Container>
				<Header menu>
					<img
						onClick={() => navigate('/')}
						src={logoImg}
						alt="Logo"
						className="cursor-pointer"
					/>
					<Menu route={location.pathname} />
					<LogoutButton onClick={() => navigate('/login')} />
				</Header>
				<div className="flex-1 pb-8">
					<div className="w-full flex flex-col md:flex-row lg:flex-row items-center">
						<div className="flex-1 w-full flex flex-col space-y-4 md:space-y-0 lg:space-y-0 md:flex-row lg:flex-row md:items-center lg:items-center md:space-x-8 lg:space-x-8 md:pr-16 lg:pr-16">
							<CustomerFormButton />
						</div>
					</div>
					<div className="flex-1 gap-y-8 mt-12 md:mt-20 lg:mt-20 flex flex-col">
						{customers.map((item, key) => {
							return <CustomerItem key={key} {...item} />;
						})}
					</div>
				</div>
			</Container>
			<BottomTabs route={location.pathname} />
		</>
	);
}
