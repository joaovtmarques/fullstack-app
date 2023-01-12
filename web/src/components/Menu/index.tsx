import { HTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';

interface MenuProps extends HTMLAttributes<HTMLDivElement> {
	route?: string;
}

export function Menu({ route, ...props }: MenuProps) {
	const navigate = useNavigate();

	const options = [
		{
			route: '/http-cats',
			title: 'Http Cats',
		},
		{
			route: '/random-dog',
			title: 'Random Dog',
		},
		{
			route: '/customers',
			title: 'Clientes',
		},
	];

	return (
		<div className="w-full hidden md:flex lg:flex items-center justify-center">
			{options.map((item, key) => {
				return (
					<div
						key={key}
						className={`text-sm lg:text-base bg-opacity-0 ${
							route === item.route ? 'text-brandPurple' : 'text-white'
						} font-medium cursor-pointer md:mx-5 lg:mx-8 hover:opacity-80`}
						onClick={() => navigate(item.route)}>
						{item.title}
					</div>
				);
			})}
		</div>
	);
}
