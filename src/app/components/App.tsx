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
import { useAppDispatch } from 'src/util';
import { coreActions } from '../core/ducks';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

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

export function App() {
	useEffect(() => {
		registerEpic(exportEpic);
	}, [registerEpic, exportEpic]);

	return (
		<LocalizationProvider dateAdapter={AdapterLuxon}>
			<AppThemeProvider>
				<CssBaseline />
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
		</LocalizationProvider>
	);
}
