import React, { Suspense } from 'react';
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react';
import './tailwind.css';
import { Provider } from 'react-redux';

import { store } from './core/logics/store';
import { Indicator } from './features/indicator';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { AppThemeProvider } from './core/components/AppThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { FixedIndicator } from './features/indicator/components/Indicator';

function GoogleAnalytics() {
	const id = (() => {
		switch (import.meta.env.MODE) {
			case 'development':
				return 'G-F5TRJ2Q2C2';
			case 'production':
				return 'G-4ZNXNCE4SW';
			default: {
				console.info('GA_MEASUREMENT_ID has NOT been found. ', import.meta.env);
				return null;
			}
		}
	})();

	if (!id) {
		return (
			<React.Fragment>
				{/* <script>{`// GA_MEASUREMENT_ID = ${id}`}</script> */}
			</React.Fragment>
		);
	}

	return (
		<React.Fragment>
			{/* <script
				async
				src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
			></script>
			<script>{`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${id}');
`}</script> */}
		</React.Fragment>
	);
}

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
				<GoogleAnalytics />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return (
		<React.StrictMode>
			<Suspense fallback={<HydrateFallback />}>
				<Provider store={store}>
					<AppThemeProvider>
						<Suspense fallback={<FixedIndicator />}>
							<LocalizationProvider dateAdapter={AdapterLuxon}>
								<BrowserRouter basename={import.meta.env.BASE_URL}>
									<CssBaseline />
									<Outlet />
									<Indicator />
								</BrowserRouter>
							</LocalizationProvider>
						</Suspense>
					</AppThemeProvider>
				</Provider>
			</Suspense>
		</React.StrictMode>
	);
}

export function HydrateFallback() {
	return <p>Loading...</p>;
}
