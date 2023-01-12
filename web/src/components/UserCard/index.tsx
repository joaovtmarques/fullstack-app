export interface UserCardProps {
	name: { first: string; last: string };
	email: string;
	login: {
		username: string;
	};
	dob: {
		age: number;
	};
	picture: {
		medium: string;
	};
}

export function UserCard({ dob, picture, email, name, login }: UserCardProps) {
	return (
		<div className="w-full px-16 py-10 md:w-72 md:h-64 lg:w-72 lg:h-64 mb-6 bg-black2 rounded-xl flex flex-col justify-center items-center cursor-pointer hover:opacity-90">
			<img
				src={picture.medium}
				alt="Avatar"
				className="h-16  w-16 md:h-22 md:w-22 lg:h-24 lg:w-24 rounded-full"
			/>
			<p className="text-sm md:text-base lg:text-base text-center text-white font-medium pt-2">
				{name.first} {name.last}
			</p>
			<p className="text-xs md:text-sm lg:text-sm text-center text-gray1 font-regular pt-1">
				{login.username} -<span> {dob.age}</span>
			</p>
			<p className="text-xs md:text-sm lg:text-sm text-center text-brandPurple font-regular pt-1">
				{email}
			</p>
		</div>
	);
}
