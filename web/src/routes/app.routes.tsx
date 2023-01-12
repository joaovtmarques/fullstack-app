import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthRoutes } from './auth.routes';
import { Cat, Customer, Dog, Home, Login, NotFound, SignUp } from '@/pages';

export function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="*" element={<NotFound />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<SignUp />} />
				<Route path="/register" element={<SignUp />} />
				<Route
					path=""
					element={
						<AuthRoutes>
							<Home />
						</AuthRoutes>
					}
				/>
				<Route
					path="/"
					element={
						<AuthRoutes>
							<Home />
						</AuthRoutes>
					}
				/>
				<Route
					path="/home"
					element={
						<AuthRoutes>
							<Home />
						</AuthRoutes>
					}
				/>
				<Route
					path="/http-cats"
					element={
						<AuthRoutes>
							<Cat />
						</AuthRoutes>
					}
				/>
				<Route
					path="/random-dog"
					element={
						<AuthRoutes>
							<Dog />
						</AuthRoutes>
					}
				/>
				<Route
					path="/customers"
					element={
						<AuthRoutes>
							<Customer />
						</AuthRoutes>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}
