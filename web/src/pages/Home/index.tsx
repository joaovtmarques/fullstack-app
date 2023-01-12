import { useState, useEffect } from 'react';
import { MagnifyingGlass } from 'phosphor-react';
import { useLocation } from 'react-router-dom';

import { useApi, useAuth } from '@/hooks';

import {
	AlertCard,
	BottomTabs,
	Container,
	Header,
	LogoutButton,
	Menu,
	NextPrevButton,
	TextInput,
	UserCard,
} from '@/components';
import { UserCardProps } from '@/components/UserCard';

import logoImg from '@/assets/logo.svg';

export function Home() {
	const auth = useAuth();
	const api = useApi();
	const location = useLocation();

	const [filter, setFilter] = useState();
	const [users, setUsers] = useState<any[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [usersPerPage, setUsersPerPage] = useState(8);
	const [alert, setAlert] = useState({
		type: '',
		text: '',
		show: false,
	});

	function onCloseAlert() {
		setAlert({
			type: '',
			text: '',
			show: false,
		});
	}

	function onShowAlert(type: string, message: string, color?: string) {
		setAlert({
			type: type,
			text: message,
			show: true,
		});
	}

	function handleFilter(filter: string) {
		if (filter !== '') {
			let filteredUsers = [];

			filteredUsers = users.filter(
				user =>
					user.email.includes(filter) ||
					user.login.username.includes(filter) ||
					user.name.first.includes(filter) ||
					user.name.last.includes(filter),
			);

			if (filteredUsers.length === 0) setUsers([]);

			setUsers(filteredUsers);
		} else {
			handleUsersPerPage(currentPage, usersPerPage);
		}
	}

	function handleCurrentPage(type: string) {
		if (type === 'prev') {
			if (currentPage === 1)
				onShowAlert('error', 'Você já está na primeira página!');

			setCurrentPage(currentPage - 1);
		} else {
			setCurrentPage(currentPage + 1);
		}
	}

	async function handleUsersPerPage(currentPage: number, usersPerPage: number) {
		const usersList = await api.listUsers({
			page: currentPage,
			perPage: usersPerPage,
		});
		setUsers(usersList.results);
	}

	useEffect(() => {
		handleUsersPerPage(currentPage, usersPerPage);
	}, [currentPage, usersPerPage]);

	useEffect(() => {
		handleFilter(filter!);
	}, [filter]);

	return (
		<>
			<Container>
				<Header menu>
					<img src={logoImg} alt="Logo" />
					<Menu route={location.pathname} />
					<LogoutButton onClick={() => auth.logout()} />
				</Header>
				<div className="flex-1 pb-8">
					<div className="w-full flex flex-col md:flex-row lg:flex-row items-center">
						<div className="flex-1 w-full flex flex-col space-y-4 md:space-y-0 lg:space-y-0 md:flex-row lg:flex-row md:items-center lg:items-center md:space-x-8 lg:space-x-8 md:pr-16 lg:pr-16">
							<div className="w-full md:w-[55%] lg:w-[55%]">
								<TextInput
									type="text"
									placeholder="Procure um usuário por nome, email ou username"
									noMargin
									icon={<MagnifyingGlass className="text-gray1" size={22} />}
									onChange={(e: any) => setFilter(e.target.value)}
								/>
							</div>
							<div className="w-full md:w-[30%] lg:w-[30%]">
								<TextInput
									type="number"
									placeholder="Usuários por página"
									noMargin
									onChange={(e: any) => setUsersPerPage(e.target.value)}
								/>
							</div>
						</div>
						<div className="hidden md:flex lg:flex items-center justify-center mt-8 md:mt-0 lg:mt-0">
							<NextPrevButton
								type="prev"
								noMargin
								onClick={() => handleCurrentPage('prev')}
							/>

							<NextPrevButton
								type="next"
								onClick={() => handleCurrentPage('next')}
							/>
						</div>
					</div>
					<div className={`${alert.type !== '' ? 'mt-8 py-8' : 'hidden'}`}>
						<AlertCard alert={alert} onCloseAlert={onCloseAlert} />
					</div>
					<div className="mt-12 md:mt-20 lg:mt-20 w-full flex flex-col md:flex-row lg:flex-row md:flex-wrap lg:flex-wrap items-center justify-center md:gap-x-6 lg:gap-x-6">
						{users.map((item: UserCardProps, key) => {
							return (
								<UserCard
									key={key}
									dob={item.dob}
									picture={item.picture}
									email={item.email}
									login={item.login}
									name={item.name}
								/>
							);
						})}
					</div>
					<div className="flex md:hidden lg:hidden items-center justify-center mt-8 md:mt-0 lg:mt-0">
						<NextPrevButton
							type="prev"
							noMargin
							onClick={() => handleCurrentPage('prev')}
						/>

						<NextPrevButton
							type="next"
							onClick={() => handleCurrentPage('next')}
						/>
					</div>
				</div>
			</Container>
			<BottomTabs route={location.pathname} />
		</>
	);
}
