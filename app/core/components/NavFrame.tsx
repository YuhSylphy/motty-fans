import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { Suspense, useEffect } from 'react';
import { Outlet } from '@remix-run/react';

import { registerEpic } from '../logics/store';
import { exportEpic } from '../logics/export-actions';

import { Indicator } from '~/features/indicator';
import { PedigreeDialog } from '~/features/pedigree';

import './NavFrame.css';
import { Footer } from './Footer';
import { Header } from './Header';

const AppBox = styled(Box)(({ theme }) => ({
	margin: theme.spacing(0.5),
}));

export const useNavFrameHooks = () => {
	useEffect(() => {
		registerEpic(exportEpic);
	}, []);
};

export function NavFrame() {
	useNavFrameHooks();
	return (
		<React.Fragment>
			<Header />
			<AppBox>
				<Suspense fallback={<Indicator />}>
					<Outlet />
				</Suspense>
			</AppBox>
			<Footer />
			<PedigreeDialog />
		</React.Fragment>
	);
}
