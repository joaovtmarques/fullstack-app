import { Check } from 'phosphor-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Checkbox from '@radix-ui/react-checkbox';

import { useAuth } from '@/hooks';

import { Button, Header, Container, TextInput } from '@/components';

import logoImg from '@/assets/logo.svg';
import phoneImg from '@/assets/phone.svg';

export function SignUp() {
	const auth = useAuth();
	const navigate = useNavigate();

	const [rememberMe, setRememberMe] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	function handleSignUp() {
		if (!email || !password || !confirmPassword)
			alert('Um ou mas campos não podem estar vazios!');

		if (password !== confirmPassword) alert('As senhas nao coincidem!');

		try {
			auth.register(email, password, rememberMe);
		} catch (err) {
			alert('Erro ao cadastrar usuário :(');
		}
	}

	function handleRedirect() {
		if (auth.token) {
			navigate('/');
		}
	}

	useEffect(() => {
		handleRedirect();
	}, [auth.token]);

	return (
		<>
			<Container>
				<Header>
					<img src={logoImg} alt="Logo" />
					<p className="inline pt-5 lg:hidden text-xs text-gray1 font-regular text-center">
						Entre para cadastrar clientes, ver usuários e mais!
					</p>
				</Header>
				<div className="flex">
					<div className="hidden lg:block pt-8 w-2/4 mr-16">
						<div>
							<p className="text-white text-4xl font-semibold">Entre para</p>
							<p className="text-gray1 text-2xl font-medium pt-4">
								Cadastrar cliente, visualizar
								<br /> usuários e mais!
							</p>
						</div>
						<div className="flex-1 relative">
							<div className="h-[409px] bg-gradient/20 filter blur-3xl z-0 relative"></div>
							<div className="flex z-20 absolute top-0 left-0">
								<p className="text-gray1 text-sm font-regular mt-20">
									Já possui uma conta? Faça login para entrar{' '}
									<span
										onClick={() => navigate('/login')}
										className="text-brandPurple cursor-pointer hover:opacity-90">
										Aqui!
									</span>{' '}
								</p>
								<img src={phoneImg} alt="Celular" className="ml-[-30px]" />
							</div>
						</div>
					</div>
					<div className="w-full flex-1 flex flex-col items-center justify-center sm:px-16 md:px-32 lg:px-0 lg:w-2/4 lg:ml-16 lg:items-start lg:justify-start">
						<p className="hidden lg:inline text-2xl text-white font-medium lg:text-4xl">
							Cadastre-se
						</p>
						<div className="w-full">
							<TextInput
								type="text"
								placeholder="Endereço de e-mail"
								onChange={(e: any) => setEmail(e.target.value)}
							/>
							<TextInput
								type="password"
								placeholder="Senha"
								onChange={(e: any) => setPassword(e.target.value)}
							/>
							<TextInput
								type="password"
								placeholder="Confirme sua senha"
								onChange={(e: any) => setConfirmPassword(e.target.value)}
							/>
						</div>
						<div className="w-full flex items-center mb-16">
							<Checkbox.Root
								onCheckedChange={checked => {
									if (checked === true) {
										setRememberMe(true);
									} else {
										setRememberMe(false);
									}
								}}
								className="w-6 h-6 p-1 rounded bg-black2">
								<Checkbox.Indicator>
									<Check className="w-4 h-4 text-brandPink" />
								</Checkbox.Indicator>
							</Checkbox.Root>
							<p className="text-xs lg:text-sm text-gray1 font-regular ml-4">
								Lembrar de mim?
							</p>
						</div>
						<Button text="Entrar" shadow onClick={handleSignUp} />
						<div className="lg:hidden w-full px-8 flex items-center justify-center text-center">
							<p className="text-gray1 text-xs font-regular mt-20">
								Já possui uma conta? Faça login para entrar{' '}
								<span
									onClick={() => navigate('/login')}
									className="text-brandPurple cursor-pointer hover:opacity-90">
									Aqui!
								</span>{' '}
							</p>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
