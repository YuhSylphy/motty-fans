import {
	AppBar,
	Box,
	Drawer,
	IconButton,
	Link as Anchor,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography,
	useTheme,
} from '@mui/material';
import {
	List as ListIcon,
	MenuOutlined,
	Timeline as TimelineIcon,
	ChangeHistory as ChangeHistoryIcon,
} from '@mui/icons-material';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Link, Routes, Route, Navigate } from 'react-router-dom';

import { useAppDispatch } from 'src/util';

import { Http404 } from 'src/features/errors/404';
import { horseDefsActions } from 'src/features/horse-defs';
import { Indicator } from 'src/features/indicator';
import { PedigreeDialog } from 'src/features/pedigree';

import './App.css';

type MenuItemDef = {
	icon: JSX.Element;
	label: string;
	path: string;
	Page: React.ComponentType;
};

const renderListItem = (def: MenuItemDef) => {
	return (
		<ListItem key={def.path} button={true} component={Link} to={def.path}>
			<ListItemIcon>{def.icon}</ListItemIcon>
			<ListItemText primary={def.label} />
		</ListItem>
	);
};

const defs: MenuItemDef[] = [
	{
		icon: <ListIcon />,
		label: '牝系図',
		path: '/mare-line',
		Page: React.lazy(() =>
			import(/* webpackChunkName: "mare-line" */ 'src/features/mare-line').then(
				(module) => ({
					default: module.MareLine,
				})
			)
		),
	},
	{
		icon: <TimelineIcon />,
		label: '家系図(旧)',
		path: '/family',
		Page: React.lazy(() =>
			import(/* webpackChunkName: "family" */ 'src/features/family').then(
				(module) => ({
					default: module.Family,
				})
			)
		),
	},
	{
		icon: <ChangeHistoryIcon />,
		label: '更新履歴',
		path: '/change-log',
		Page: React.lazy(() =>
			import(
				/* webpackChunkName: "change-log" */ 'src/features/changelog'
			).then((module) => ({
				default: module.ChangeLog,
			}))
		),
	},
];

const MenuList: React.FC<{
	toggleMenu: () => void;
}> = ({ toggleMenu }) => {
	return (
		<List onClick={toggleMenu} onKeyDown={toggleMenu}>
			{defs.map(renderListItem)}
		</List>
	);
};

const Header: React.FC = () => {
	const [menuOpen, setMenuOpen] = useState<boolean>(false);

	const toggleMenu = useMemo(
		() => () => {
			setMenuOpen(!menuOpen);
		},
		[menuOpen, setMenuOpen]
	);

	return (
		<React.Fragment>
			<AppBar position="static">
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
};

const Footer: React.FC = () => {
	const theme = useTheme();
	return (
		<Box display="flex" justifyContent="flex-end" margin={theme.spacing(0.2)}>
			<Anchor href="https://www.youtube.com/user/MOTTYGAMES/" target="__blank">
				MOTTV
			</Anchor>
		</Box>
	);
};

export const App: React.FC = () => {
	const theme = useTheme();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(horseDefsActions.init());
	}, [dispatch]);

	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<React.Fragment>
				<Header />
				<Box margin={theme.spacing(0.5)}>
					<Suspense fallback={<div>loading...</div>}>
						<Routes>
							{defs.map(({ path, Page }) => (
								<Route key={path} path={path} element={<Page />} />
							))}
							<Route path="/" key="/" element={<Navigate to="/mare-line" />} />
							<Route key="404" element={<Http404 />} />
						</Routes>
					</Suspense>
				</Box>
				<Footer />
				<PedigreeDialog />
				<Indicator />
			</React.Fragment>
		</BrowserRouter>
	);
};
