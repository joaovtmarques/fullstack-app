import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useApi, useAuth } from '@/hooks';

import {
	BottomTabs,
	Button,
	Container,
	Header,
	LogoutButton,
	Menu,
} from '@/components';

import logoImg from '@/assets/logo.svg';

export function Dog() {
	const auth = useAuth();
	const api = useApi();
	const location = useLocation();
	const navigate = useNavigate();

	const [dog, setDog] = useState('');

	async function handleGetDog() {
		const dog = await api.getDog();

		setDog(dog);
	}

	useEffect(() => {
		handleGetDog();
	}, []);

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
					<LogoutButton onClick={() => auth.logout()} />
				</Header>
				<div className="flex-1 pb-8">
					<div className="w-full flex flex-col md:flex-row lg:flex-row items-center">
						<div className="flex-1 w-full flex flex-col space-y-4 md:space-y-0 lg:space-y-0 md:flex-row lg:flex-row md:items-center lg:items-center md:space-x-8 lg:space-x-8 md:pr-16 lg:pr-16">
							<div className="w-full md:w-[40%] lg:w-[40%]">
								<Button text="Gerar dog" shadow onClick={handleGetDog} />
							</div>
						</div>
					</div>
					<div className="mt-12 md:mt-20 lg:mt-20 w-full flex flex-col md:flex-row lg:flex-row md:flex-wrap lg:flex-wrap items-center justify-start md:gap-x-8 lg:gap-x-8">
						<div className="w-full h-auto md:h-[300px] md:w-[490px] lg:h-[400px] lg:w-[590px] p-[1.5px] bg-border overflow-hidden rounded-xl">
							{dog && dog.slice(dog.length - 3) !== 'mp4' ? (
								<img src={dog} alt="Dog" className="w-full h-full rounded-xl" />
							) : (
								<video
									src={dog}
									className="w-full h-full rounded-xl"
									controls
									autoPlay={true}
									loop
								/>
							)}
						</div>
					</div>
				</div>
			</Container>
			<BottomTabs route={location.pathname} />
		</>
	);
}
