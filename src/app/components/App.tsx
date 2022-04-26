import {
	AppBar,
	Box,
	CssBaseline,
	Drawer,
	IconButton,
	Link as Anchor,
	Toolbar,
	Typography,
} from '@mui/material';
import { MenuOutlined } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { registerEpic } from '../core/store';
import { exportEpic } from '../core/export-actions';

import { Http404 } from 'src/features/errors/404';
import { Indicator } from 'src/features/indicator';
import { PedigreeDialog } from 'src/features/pedigree';

import './App.css';
import { AppThemeProvider } from './AppThemeProvider';
import { getPageDef, MenuList } from './Menu';
import { defaultRoute } from '../core/menu-defs';

const useHeaderHooks = () => {
	const [menuOpen, setMenuOpen] = useState<boolean>(false);

	const toggleMenu = useCallback(() => {
		setMenuOpen(!menuOpen);
	}, [menuOpen, setMenuOpen]);

	return { menuOpen, toggleMenu };
};

function Header() {
	const { menuOpen, toggleMenu } = useHeaderHooks();
	return (
		<React.Fragment>
			<AppBar position="static" enableColorOnDark>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="menu"
						onClick={toggleMenu}
						size="large"
					>
						<MenuOutlined />
					</IconButton>
					<Typography variant="h6">MOTTV Derby</Typography>
					{/* <Button color="inherit">Login</Button> */}
				</Toolbar>
			</AppBar>
			<Drawer open={menuOpen} onClose={toggleMenu}>
				<MenuList toggleMenu={toggleMenu} />
			</Drawer>
		</React.Fragment>
	);
}

const FooterBox = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'flex-end',
	margin: theme.spacing(0.2),
}));

function Footer() {
	return (
		<FooterBox>
			<Anchor href="https://www.youtube.com/user/MOTTYGAMES/" target="__blank">
				MOTTV
			</Anchor>
		</FooterBox>
	);
}

const AppBox = styled(Box)(({ theme }) => ({
	margin: theme.spacing(0.5),
}));

const defs = getPageDef();
export function App() {
	useEffect(() => {
		registerEpic(exportEpic);
	}, [registerEpic, exportEpic]);

	return (
		<AppThemeProvider>
			<CssBaseline />
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				<React.Fragment>
					<Header />
					<AppBox>
						<Suspense fallback={<div>loading...</div>}>
							<Routes>
								{defs.map(({ path, Page }) => (
									<Route key={path} path={path} element={<Page />} />
								))}
								<Route
									path="/"
									key="/"
									element={<Navigate to={defaultRoute} />}
								/>
								<Route key="404" element={<Http404 />} />
							</Routes>
						</Suspense>
					</AppBox>
					<Footer />
					<PedigreeDialog />
					<Indicator />
				</React.Fragment>
			</BrowserRouter>
		</AppThemeProvider>
	);
}
