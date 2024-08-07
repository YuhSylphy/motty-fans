import {
	AppBar,
	Divider,
	Drawer,
	IconButton,
	Toolbar,
	Typography,
} from '@mui/material';
import { MenuOutlined } from '@mui/icons-material';

import React, { useCallback, useState } from 'react';
import { MenuList } from './Menu';
import { useAppSelector } from '~/util';
import { Footer } from './Footer';

const useHeaderHooks = () => {
	const [menuOpen, setMenuOpen] = useState<boolean>(false);

	const toggleMenu = useCallback(() => {
		setMenuOpen(!menuOpen);
	}, [menuOpen, setMenuOpen]);

	const title = useAppSelector((state) => state.core.title);

	return { menuOpen, toggleMenu, title };
};

export function Header() {
	const { menuOpen, toggleMenu, title } = useHeaderHooks();
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
					<Typography variant="h6">{title}</Typography>
					{/* <Button color="inherit">Login</Button> */}
				</Toolbar>
			</AppBar>
			<Drawer open={menuOpen} onClose={toggleMenu}>
				<MenuList toggleMenu={toggleMenu} />
				<Divider />
				<Footer />
			</Drawer>
		</React.Fragment>
	);
}
