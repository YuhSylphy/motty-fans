import { Box, CssBaseline } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import React, { Suspense, useEffect } from 'react';
import { Outlet } from '@remix-run/react';

import { registerEpic } from '../logics/store';
import { exportEpic } from '../logics/export-actions';

import { Indicator } from '~/features/indicator';
import { PedigreeDialog } from '~/features/pedigree';

import './NavFrame.css';
import { AppThemeProvider } from './AppThemeProvider';
import { Footer } from './Footer';
import { Header } from './Header';
import { BrowserRouter } from 'react-router-dom';

const AppBox = styled(Box)(({ theme }) => ({
	margin: theme.spacing(0.5),
}));

export function NavFrame() {
	useEffect(() => {
		registerEpic(exportEpic);
	}, []);

	return (
		<Suspense fallback={<Indicator />}>
			<LocalizationProvider dateAdapter={AdapterLuxon}>
				<AppThemeProvider>
					<BrowserRouter basename={import.meta.env.BASE_URL}>
						<CssBaseline />
						<Header />
						<AppBox>
							<Suspense fallback={<Indicator />}>
								<Outlet />
							</Suspense>
						</AppBox>
						<Footer />
						<PedigreeDialog />
						<Indicator />
					</BrowserRouter>
				</AppThemeProvider>
			</LocalizationProvider>
		</Suspense>
	);
}
