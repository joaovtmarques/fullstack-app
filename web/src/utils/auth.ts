import { useApi } from '@/hooks';

export function setAuthLocalStorage(refreshToken: string | null) {
	localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
}

export function getAuthLocalStorage() {
	const json = localStorage.getItem('refreshToken');

	if (!json) return null;

	const auth = JSON.parse(json);

	return auth ?? null;
}

export async function LoginRequest(username: string, password: string) {
	try {
		return useApi().login(username, password);
	} catch (err) {
		return null;
	}
}

export async function RegisterRequest(username: string, password: string) {
	try {
		return useApi().register(username, password);
	} catch (err) {
		return null;
	}
}

export async function RefreshToken(refreshToken: string) {
	try {
		return useApi().refreshToken(refreshToken);
	} catch (err) {
		return null;
	}
}
