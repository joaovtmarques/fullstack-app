import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/main.css';

import { AppRoutes } from './routes';
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<AuthProvider>
			<div className="h-screen w-screen select-none">
				<AppRoutes />
			</div>
		</AuthProvider>
	</React.StrictMode>,
);
