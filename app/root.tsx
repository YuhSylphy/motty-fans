import React from 'react';
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
			<Provider store={store}>
				<Outlet />
			</Provider>
		</React.StrictMode>
	);
}

export function HydrateFallback() {
	return <p>Loading...</p>;
}
