import { useNavigate } from 'react-router-dom';

import { Container, Header } from '@/components';

import logoImg from '@/assets/logo.svg';

export function NotFound() {
	const navigate = useNavigate();

	return (
		<Container>
			<Header>
				<img src={logoImg} alt="Logo" />
			</Header>
			<div className="flex-1 py-48 flex items-center justify-center">
				<p className="text-xs md:text-base lg:text-base text-white text-center font-regular">
					Página não encontrada :( <br />
					<span className="text-brandPurple" onClick={() => navigate('/')}>
						Ir para página inicial
					</span>
				</p>
			</div>
		</Container>
	);
}
