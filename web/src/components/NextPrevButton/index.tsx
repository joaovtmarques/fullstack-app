import { HTMLAttributes } from 'react';
import { CaretRight, CaretLeft } from 'phosphor-react';

interface NextPrevButtonProps extends HTMLAttributes<HTMLDivElement> {
	type: string;
	noMargin?: boolean;
}

export function NextPrevButton({
	type,
	noMargin,
	...props
}: NextPrevButtonProps) {
	return (
		<div
			{...props}
			className={`p-3 bg-brandPurple shadow-button flex items-center justify-center rounded-xl ${
				noMargin ? 'ml-0' : 'ml-8'
			} cursor-pointer hover:opacity-90`}>
			{type === 'prev' ? (
				<CaretLeft className="text-white" size={22} />
			) : (
				<CaretRight className="text-white" size={22} />
			)}
		</div>
	);
}
