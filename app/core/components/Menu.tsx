import {
	Collapse,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import React, { useMemo } from 'react';
import { Link } from '@remix-run/react';

import {
	menuDefs,
	MenuItemDef,
	NestMenuItemDef,
	PageMenuItemDef,
} from '../logics/menu-defs';

type HasDepth = {
	depth: number;
};

type MenuItemDefWithDepth = MenuItemDef & HasDepth;
type NestMenuItemDefWithDepth = NestMenuItemDef & HasDepth;
type PageMenuItemDefWithDepth = PageMenuItemDef & HasDepth;

function PageItem(def: PageMenuItemDefWithDepth) {
	if (def.hideInMenu) {
		return null;
	}
	return (
		<ListItemButton
			key={def.path}
			component={Link}
			to={def.path}
			sx={{ pl: (def.depth + 1) * 2 }}
		>
			<ListItemIcon>{def.icon}</ListItemIcon>
			<ListItemText primary={def.label} />
		</ListItemButton>
	);
}

function NestItem(def: NestMenuItemDefWithDepth) {
	const children = useMemo(
		() =>
			def.children
				.map((child) => ({ ...child, depth: def.depth + 1 }))
				.map(MenuListItem),
		[def.children, def.depth]
	);
	return (
		<React.Fragment>
			<ListItem key={`nest-${def.label}`} sx={{ pl: (def.depth + 1) * 2 }}>
				<ListItemIcon>{def.icon}</ListItemIcon>
				<ListItemText primary={def.label} />
			</ListItem>
			<Collapse in key={`collapse-${def.label}`}>
				{children}
			</Collapse>
		</React.Fragment>
	);
}

function MenuListItem(def: MenuItemDefWithDepth) {
	switch (def.type) {
		case 'nest':
			return NestItem(def);
		case 'page':
			return PageItem(def);
		case 'divider':
			return <Divider />;
		default: {
			const exhaust: never = def;
			throw exhaust;
		}
	}
}

export type MenuListProps = {
	toggleMenu: () => void;
};

const defs = menuDefs.map((def) => ({ ...def, depth: 0 }));
export function MenuList({ toggleMenu }: MenuListProps) {
	return (
		<List onClick={toggleMenu} onKeyDown={toggleMenu}>
			{defs.map((def, ix) => (
				<MenuListItem key={`menu-${ix}`} {...def} />
			))}
		</List>
	);
}

const selectPageDef = ({ path, Page, title }: PageMenuItemDef) => ({
	path,
	Page,
	title,
});

function extractPageDef(
	defs: MenuItemDef[]
): ReturnType<typeof selectPageDef>[] {
	return defs.flatMap((def) => {
		switch (def.type) {
			case 'nest':
				return extractPageDef(def.children);
			case 'page':
				return selectPageDef(def);
			case 'divider':
				return [];
			default: {
				const exhaust: never = def;
				throw exhaust;
			}
		}
	});
}

export const getPageDef = () => extractPageDef(menuDefs);
