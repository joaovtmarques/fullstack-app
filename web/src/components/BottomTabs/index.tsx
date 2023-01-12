import { Cat, Dog, House, Person } from 'phosphor-react';
import { HTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';

interface BottomTabsProps extends HTMLAttributes<HTMLDivElement> {
	route?: string;
}

export function BottomTabs({ route, ...props }: BottomTabsProps) {
	const navigate = useNavigate();

	const options = [
		{
			route: '/',
			icon: (
				<House
					className={
						route === '/' || route === '/home' || route === '/*'
							? 'text-brandPink '
							: 'text-white'
					}
					size={20}
				/>
			),
		},
		{
			route: '/http-cats',
			icon: (
				<Cat
					className={route === '/http-cats' ? 'text-brandPink' : 'text-white'}
					size={20}
				/>
			),
		},
		{
			route: '/random-dog',
			icon: (
				<Dog
					className={route === '/random-dog' ? 'text-brandPink' : 'text-white'}
					size={20}
				/>
			),
		},
		{
			route: '/customers',
			icon: (
				<Person
					className={route === '/customers' ? 'text-brandPink' : 'text-white'}
					size={20}
				/>
			),
		},
	];

	return (
		<div className="w-full py-4 flex md:hidden lg:hidden items-center justify-center bg-black3 rounded-t-xl fixed bottom-0">
			{options.map((item, key) => {
				return (
					<div
						key={key}
						className="flex-1 hover:opacity-80 flex items-center justify-center"
						onClick={() => navigate(item.route)}>
						{item.icon}
					</div>
				);
			})}
		</div>
	);
}
