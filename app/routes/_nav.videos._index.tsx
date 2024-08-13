import React from 'react';
import { MetaFunction } from '@remix-run/react';
import { findPageDef } from '~/core/logics/menu-defs';
import { useCommonVideosPageHooks } from './_nav.videos';

const { title, Page } = findPageDef('/videos');

export const meta: MetaFunction = () => {
	return [{ title }, { name: 'description', content: title }];
};

export const useVideosPageHooks = () => {
	useCommonVideosPageHooks();
};

export default function VideosPage() {
	useVideosPageHooks();
	return <Page />;
}
