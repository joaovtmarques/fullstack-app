import { ButtonHTMLAttributes, HTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	text: string;
	color?: string;
	shadow?: boolean;
	height?: string;
}

export function Button({ text, color, shadow, height, ...props }: ButtonProps) {
	return (
		<button
			{...props}
			className={`w-full ${height || 'h-16'} ${
				color || 'bg-brandPurple'
			} rounded-xl flex items-center justify-center cursor-pointer hover:opacity-80 ${
				shadow && 'shadow-button'
			}`}>
			<p className="text-white text-xs md:text-base lg:text-base font-medium">
				{text}
			</p>
		</button>
	);
}
