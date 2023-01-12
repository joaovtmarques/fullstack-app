import { useState } from 'react';
import { Pencil, Trash } from 'phosphor-react';

import { useApi, useAuth } from '@/hooks';

import { CustomerForm, DialogPrimitive, DialogTrigger } from '../CustomerForm';

import { CustomerProps } from '@/types/Customer';

import avatarImg from '../../assets/avatar.svg';

export function CustomerItem(props: CustomerProps) {
	const auth = useAuth();
	const api = useApi();

	const [open, setOpen] = useState(false);

	async function handleDeleteCustomer(id: string) {
		await api.deleteCustomer(id, auth.token!);
	}

	return (
		<div className="w-full p-6 rounded-xl bg-black2 flex flex-col md:flex-row lg:flex-row gap-y-6 items-center justify-between hover:opacity-90">
			<DialogPrimitive>
				<DialogTrigger>
					<div className="cursor-pointer" onClick={() => setOpen(true)}>
						<Pencil size={22} className="text-white" weight="light" />
					</div>
					<CustomerForm
						id={props.id}
						defaultValues={props}
						open={open}
						setOpen={setOpen}
					/>
				</DialogTrigger>
			</DialogPrimitive>

			<div className="w-full flex flex-col items-center md:m-4 lg:m-4 justify-between gap-4 md:flex-row lg:flex-row">
				<div className="w-auto flex items-center justify-center">
					<div className="hidden sm:flex h-10 w-10 mr-4 bg-border rounded-full items-center justify-center">
						<img src={avatarImg} alt="" />
					</div>
					<div className="text-center md:text-left lg:text-left">
						<p className="text-sm lg:text-base text-white font-medium">
							{props.name}
						</p>
						<p className="text-[10px] lg:text-xs text-gray1 font-regular">
							{props.email}
						</p>
					</div>
				</div>
				<div className="h-full lg:w-auto text-center md:text-left lg:text-left">
					<p className="text-[10px] lg:text-xs text-gray1 font-regular">
						Telefone
					</p>
					<p className="text-sm lg:text-base text-white font-medium ">
						{props.phoneNumber}
					</p>
				</div>
				<div className="h-full lg:w-auto text-center md:text-left lg:text-left">
					<p className="text-[10px] lg:text-xs text-gray1 font-regular">CPF</p>
					<p className="text-sm lg:text-base text-white font-medium ">
						{props.cpf}
					</p>
				</div>
				<div className="h-full lg:w-auto text-center md:text-left lg:text-left">
					<p className="text-[10px] lg:text-xs text-gray1 font-regular">Rua</p>
					<p className="text-sm lg:text-base text-white font-medium">
						{props.address.street}
					</p>
				</div>
				<div className="h-full lg:w-auto text-center md:text-left lg:text-left">
					<p className="text-[10px] lg:text-xs text-gray1 font-regular">
						Bairro
					</p>
					<p className="text-sm lg:text-base text-white font-medium">
						{props.address.district}
					</p>
				</div>
				<div className="h-full lg:w-auto text-center md:text-left lg:text-left">
					<p className="text-[10px] lg:text-xs text-gray1 font-regular">
						Cidade - Estado
					</p>
					<p className="text-sm lg:text-base text-white font-medium">
						{props.address.city} - {props.address.state}
					</p>
				</div>
			</div>

			<div
				className="cursor-pointer"
				onClick={() => handleDeleteCustomer(props.id!)}>
				<Trash size={22} className="text-white" weight="light" />
			</div>
		</div>
	);
}
