import React from 'react';
import {
	List as ListIcon,
	Timeline as TimelineIcon,
	ChangeHistory as ChangeHistoryIcon,
	YouTube as YouTubeIcon,
} from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHorse } from '@fortawesome/free-solid-svg-icons';

export type MenuItemDef =
	| PageMenuItemDef
	| NestMenuItemDef
	| DividerMenuItemDef;

export type NestMenuItemDef = {
	type: 'nest';
	icon: JSX.Element;
	label: string;
	children: MenuItemDef[];
};

export type PageMenuItemDef = {
	type: 'page';
	icon: JSX.Element;
	label: string;
	path: string;
	Page: React.ComponentType;
};

export type DividerMenuItemDef = {
	type: 'divider';
};
const divider: DividerMenuItemDef = {
	type: 'divider',
};

export const defaultRoute = '/videos';
export const menuDefs: MenuItemDef[] = [
	{
		type: 'page',
		icon: <YouTubeIcon />,
		label: 'YouTube 動画一覧',
		path: '/videos',
		Page: React.lazy(
			() => import(/* webpackChunkName: "videos" */ 'src/features/videos/lazy')
		),
	},
	divider,
	{
		type: 'nest',
		icon: <FontAwesomeIcon icon={faHorse} />, // to be horse icon
		label: 'ダビスタ',
		children: [
			{
				type: 'page',
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
				type: 'page',
				icon: <TimelineIcon />,
				label: '家系図(旧)',
				path: '/family',
				Page: React.lazy(
					() =>
						import(/* webpackChunkName: "family" */ 'src/features/family/lazy')
				),
			},
		],
	},
	divider,
	{
		type: 'page',
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
