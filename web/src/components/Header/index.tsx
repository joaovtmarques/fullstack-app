interface HeaderProps {
	children: React.ReactNode;
	menu?: boolean;
}

export function Header({ children, menu }: HeaderProps) {
	return (
		<div
			className={`w-full h-11 flex flex-col items-center justify-center lg:mt-0 lg:justify-between ${
				menu ? 'md:flex-row' : ''
			} lg:flex-row mb-6 md:mb-16 lg:mb-16`}>
			{children}
		</div>
	);
}
