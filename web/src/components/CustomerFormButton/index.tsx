import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import { Button } from '../Button';
import { CustomerForm } from '../CustomerForm';

export function CustomerFormButton() {
	const [open, setOpen] = useState(false);

	return (
		<Dialog.Root>
			<Dialog.Trigger className="w-full md:w-[40%] lg:w-[40%]">
				<Button text="Cadastrar cliente" shadow onClick={() => setOpen(true)} />
				<CustomerForm open={open} setOpen={setOpen} />
			</Dialog.Trigger>
		</Dialog.Root>
	);
}
