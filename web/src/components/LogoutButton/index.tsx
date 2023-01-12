import { HTMLAttributes } from 'react';

export function LogoutButton({ ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			{...props}
			className="sm:h-9 lg:h-11 md:px-8 lg:px-11 bg-black2 hidden md:flex lg:flex items-center justify-center rounded-xl cursor-pointer hover:opacity-90">
			<p className="text-white text-sm font-medium lg:text-base">Sair</p>
		</div>
	);
}
