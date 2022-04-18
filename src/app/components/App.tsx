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
} from '@mui/material';
import {
	List as ListIcon,
	MenuOutlined,
	Timeline as TimelineIcon,
	ChangeHistory as ChangeHistoryIcon,
	YouTube as YouTubeIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Link, Routes, Route, Navigate } from 'react-router-dom';

import { registerEpic } from '../core/store';
import { exportEpic } from '../core/export-actions';

import { Http404 } from 'src/features/errors/404';
import { Indicator } from 'src/features/indicator';
import { PedigreeDialog } from 'src/features/pedigree';

import './App.css';

type MenuItemDef = {
	icon: JSX.Element;
	label: string;
	path: string;
	Page: React.ComponentType;
};

function MenuListItem(def: MenuItemDef) {
	return (
		<ListItem key={def.path} button={true} component={Link} to={def.path}>
			<ListItemIcon>{def.icon}</ListItemIcon>
			<ListItemText primary={def.label} />
		</ListItem>
	);
}

const defs: MenuItemDef[] = [
	{
		icon: <YouTubeIcon />,
		label: 'YouTube 動画一覧',
		path: '/videos',
		Page: React.lazy(
			() => import(/* webpackChunkName: "videos" */ 'src/features/videos/lazy')
		),
	},
	{
		icon: <ListIcon />,
		label: '牝系図',
		path: '/mare-line',
		Page: React.lazy(
			() =>
				import(
					/* webpackChunkName: "mare-line" */ 'src/features/mare-line/lazy'
				)
		),
	},
	{
		icon: <TimelineIcon />,
		label: '家系図(旧)',
		path: '/family',
		Page: React.lazy(
			() => import(/* webpackChunkName: "family" */ 'src/features/family/lazy')
		),
	},
	{
		icon: <ChangeHistoryIcon />,
		label: '更新履歴',
		path: '/change-log',
		Page: React.lazy(
			() =>
				import(
					/* webpackChunkName: "change-log" */ 'src/features/changelog/lazy'
				)
		),
	},
];

type MenuListProps = {
	toggleMenu: () => void;
};

function MenuList({ toggleMenu }: MenuListProps) {
	return (
		<List onClick={toggleMenu} onKeyDown={toggleMenu}>
			{defs.map(MenuListItem)}
		</List>
	);
}

function Header() {
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

export function App() {
	useEffect(() => {
		registerEpic(exportEpic);
	}, [registerEpic, exportEpic]);

	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<React.Fragment>
				<Header />
				<AppBox>
					<Suspense fallback={<div>loading...</div>}>
						<Routes>
							{defs.map(({ path, Page }) => (
								<Route key={path} path={path} element={<Page />} />
							))}
							<Route path="/" key="/" element={<Navigate to="/mare-line" />} />
							<Route key="404" element={<Http404 />} />
						</Routes>
					</Suspense>
				</AppBox>
				<Footer />
				<PedigreeDialog />
				<Indicator />
			</React.Fragment>
		</BrowserRouter>
	);
}
