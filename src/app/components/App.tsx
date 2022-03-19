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
} from '@material-ui/core';
import {
	List as ListIcon,
	MenuOutlined,
	Timeline as TimelineIcon,
	ChangeHistory as ChangeHistoryIcon,
} from '@material-ui/icons';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';

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
			import('src/features/mare-line').then((module) => ({
				default: module.MareLine,
			}))
		),
	},
	{
		icon: <TimelineIcon />,
		label: '家系図(旧)',
		path: '/family',
		Page: React.lazy(() =>
			import('src/features/family').then((module) => ({
				default: module.Family,
			}))
		),
	},
	{
		icon: <ChangeHistoryIcon />,
		label: '更新履歴',
		path: '/change-log',
		Page: React.lazy(() =>
			import('src/features/changelog').then((module) => ({
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
						<Switch>
							{defs.map(({ path, Page }) => (
								<Route key={path} path={path}>
									<Page />
								</Route>
							))}
							<Route exact path="/" key="/">
								<Redirect to="/mare-line" />
							</Route>
							<Route key="404">
								<Http404 />
							</Route>
						</Switch>
					</Suspense>
				</Box>
				<Footer />
				<PedigreeDialog />
				<Indicator />
			</React.Fragment>
		</BrowserRouter>
	);
};
