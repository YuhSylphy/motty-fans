import React from 'react';
import {
	List as ListIcon,
	Timeline as TimelineIcon,
	ChangeHistory as ChangeHistoryIcon,
	YouTube as YouTubeIcon,
	Info as InfoIcon,
	BrowseGallery as BrowseGalleryIcon,
} from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHorse } from '@fortawesome/free-solid-svg-icons';

const hideInDev = import.meta.env.MODE !== 'development';

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
	title: string;
	hideInMenu?: boolean;
};

export type DividerMenuItemDef = {
	type: 'divider';
};
const divider: DividerMenuItemDef = {
	type: 'divider',
};

export function findPageDef(targetPath: string) {
	return (
		menuDefs
			.flatMap((x) => ('children' in x ? x.children : x))
			.filter((x): x is PageMenuItemDef => x.type === 'page')
			.find(({ path }) => path === targetPath) ??
		(() => {
			throw Error(
				`targetPath has NOT been found: ${menuDefs
					.filter((x): x is PageMenuItemDef => x.type === 'page')
					.map(({ path }) => path)}`
			);
		})()
	);
}

export const defaultRoute = '/videos';
export const menuDefs: MenuItemDef[] = [
	{
		type: 'page' as const,
		icon: <InfoIcon />,
		label: 'プロフィール',
		path: '/profile',
		Page: React.lazy(
			() => import(/* webpackChunkName: "profile" */ '~/features/profile/lazy')
		),
		title: 'MOTTY fans - プロフィール',
		hideInMenu: false,
	},
	{
		type: 'page' as const,
		icon: <BrowseGalleryIcon />,
		label: '実況シリーズ一覧',
		path: '/live-series',
		Page: React.lazy(
			() =>
				import(
					/* webpackChunkName: "live-series" */ '~/features/live-series/lazy'
				)
		),
		title: 'MOTTY fans - 実況シリーズ一覧',
		hideInMenu: hideInDev, // TODO: 公開に合わせてメニュー表示？
	},
	// TODO: クエリパラメータによる条件保存対応: フレームワーク移行後？
	...['', '/:hash'].map((params) => ({
		type: 'page' as const,
		icon: <YouTubeIcon />,
		label: 'YouTube 動画一覧',
		path: `/videos${params}`,
		Page: React.lazy(
			() => import(/* webpackChunkName: "videos" */ '~/features/videos/lazy')
		),
		title: 'MOTTY fans - YouTube 動画一覧',
		hideInMenu: !!params,
	})),
	divider,
	{
		type: 'nest',
		icon: <FontAwesomeIcon icon={faHorse} />,
		label: 'ダビスタ(Switch版)記録',
		children: [
			{
				type: 'page',
				icon: <ListIcon />,
				label: '牝系図',
				path: '/mare-line',
				Page: React.lazy(
					() =>
						import(
							/* webpackChunkName: "mare-line" */ '~/features/mare-line/lazy'
						)
				),
				title: 'MOTTY fans - ダビスタ - 牝系図',
			},
			{
				type: 'page',
				icon: <TimelineIcon />,
				label: '家系図(旧)',
				path: '/family',
				Page: React.lazy(
					() =>
						import(/* webpackChunkName: "family" */ '~/features/family/lazy')
				),
				title: 'MOTTY fans - ダビスタ - 家系図(旧)',
			},
		],
	},
	divider,
	{
		type: 'page',
		icon: <ChangeHistoryIcon />,
		label: '変更履歴',
		path: '/change-log',
		Page: React.lazy(
			() =>
				import(/* webpackChunkName: "change-log" */ '~/features/changelog/lazy')
		),
		title: 'MOTTY fans - 変更履歴',
	},
];
