import { Box, CssBaseline } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';

import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { registerEpic } from '../core/store';
import { exportEpic } from '../core/export-actions';

import { Http404 } from 'src/features/errors/404';
import { Indicator } from 'src/features/indicator';
import { PedigreeDialog } from 'src/features/pedigree';

import './App.css';
import { AppThemeProvider } from './AppThemeProvider';
import { getPageDef } from './Menu';
import { defaultRoute } from '../core/menu-defs';
import { Footer } from './Footer';
import { Header } from './Header';
import { useAppDispatch, useAppSelector } from 'src/util';
import { coreActions } from '../core/ducks';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const AppBox = styled(Box)(({ theme }) => ({
	margin: theme.spacing(0.5),
}));

const defs = getPageDef();

type RoutedElementProps = {
	path: string;
	Page: React.ComponentType;
	title: string;
};

const useRoutedElementHooks = (title: string) => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(coreActions.setTitle(title));
	}, [title, dispatch]);
};

function RoutedElement({ Page, title }: RoutedElementProps) {
	useRoutedElementHooks(title);
	return <Page />;
}

function AppBody() {
	return (
		<AppBox>
			<Suspense fallback={<Indicator />}>
				<Routes>
					{defs.map((def) => (
						<Route
							key={def.path}
							path={def.path}
							element={<RoutedElement {...def} />}
						/>
					))}
					<Route path="/" key="/" element={<Navigate to={defaultRoute} />} />
					<Route key="404" element={<Http404 />} />
				</Routes>
			</Suspense>
		</AppBox>
	);
}

function GoogleAnalytics() {
	const id = (() => {
		switch (process.env.NODE_ENV) {
			case 'development':
				return 'G-F5TRJ2Q2C2';
			case 'production':
				return 'G-4ZNXNCE4SW';
			default: {
				console.info('GA_MEASUREMENT_ID has NOT been found. ', process.env);
				return null;
			}
		}
	})();

	if (!id) {
		return (
			<Helmet>
				<script>{`// GA_MEASUREMENT_ID = ${id}`}</script>
			</Helmet>
		);
	}

	return (
		<Helmet>
			<script
				async
				src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
			></script>
			<script>{`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${id}');
`}</script>
		</Helmet>
	);
}

function Head() {
	const title = useAppSelector((state) => state.core.title);
	return (
		<Helmet>
			<title>{title}</title>
		</Helmet>
	);
}

export function App() {
	useEffect(() => {
		registerEpic(exportEpic);
	}, [registerEpic, exportEpic]);

	return (
		<LocalizationProvider dateAdapter={AdapterLuxon}>
			<HelmetProvider>
				<AppThemeProvider>
					<CssBaseline />
					<GoogleAnalytics />
					<Head />
					<BrowserRouter basename={process.env.PUBLIC_URL}>
						<React.Fragment>
							<Header />
							<AppBody />
							<Footer />
							<PedigreeDialog />
							<Indicator />
						</React.Fragment>
					</BrowserRouter>
				</AppThemeProvider>
			</HelmetProvider>
		</LocalizationProvider>
	);
}
