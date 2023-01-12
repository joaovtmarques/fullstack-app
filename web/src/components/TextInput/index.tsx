import { EyeSlash, Eye } from 'phosphor-react';
import { useState, HTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form/dist/types';

interface TextInputProps
	extends HTMLAttributes<HTMLDivElement | HTMLInputElement> {
	icon?: JSX.Element;
	type: string;
	placeholder?: string;
	noMargin?: boolean;
	height?: string;
	text?: string;
	textLg?: string;
	register?: UseFormRegisterReturn<string>;
}

export function TextInput({
	icon,
	type,
	placeholder,
	noMargin,
	height,
	text,
	textLg,
	register,
	...props
}: TextInputProps) {
	const [hidden, setHidden] = useState(true);

	return (
		<div
			className={`w-full ${height || 'h-16'} flex ${
				noMargin ? 'my-0' : 'my-8'
			} bg-black2 rounded-xl overflow-hidden focus-within:border-brandPink border-2 border-solid`}>
			<input
				{...props}
				type={
					type === 'password' && hidden
						? type
						: type === 'password' && !hidden
						? 'text'
						: type
				}
				placeholder={placeholder}
				{...register}
				className={`
				flex-1 w-full outline-none px-8 bg-black2 text-gray1 ${
					text && textLg
						? `text-${text} md:text-${textLg} lg:text-${textLg}`
						: 'text-xs md:text-base lg:text-base'
				} font-regular focus:text-white
				`}
			/>
			{type === 'password' && icon !== null ? (
				<div
					className="flex items-center justify-center pl-1 pr-4 md:px-4 lg:px-4"
					onClick={() => setHidden(!hidden)}>
					{!hidden ? (
						<Eye className="text-gray1" size={22} />
					) : (
						<EyeSlash className="text-gray1" size={22} />
					)}
				</div>
			) : (
				<div
					{...props}
					className={`flex items-center justify-center ${
						(icon && 'px-4 cursor-pointer') || 'px-1'
					}`}>
					{icon}
				</div>
			)}
		</div>
	);
}
