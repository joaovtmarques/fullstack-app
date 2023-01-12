export interface Auth {
	token?: string;
}

export interface ContextProps extends Auth {
	authenticate: (
		email: string,
		password: string,
		rememberMe: boolean,
	) => Promise<void>;

	register: (
		email: string,
		password: string,
		rememberMe: boolean,
	) => Promise<void>;

	refreshToken: (token: string) => Promise<void>;

	logout: () => void;

	getAuthLocalStorage: () => string;
}

export interface AuthProviderProps {
	children: JSX.Element;
}
