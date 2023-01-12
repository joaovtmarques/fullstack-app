interface ContainerProps {
	children: React.ReactNode;
	flex?: boolean;
}

export function Container({ children, flex }: ContainerProps) {
	return (
		<div
			className={`h-full w-full overflow-x-hidden ${
				flex ? 'flex justify-center' : ''
			} bg-black0 py-10 px-10 lg:px-36 `}>
			{children}
		</div>
	);
}
