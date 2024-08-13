import React from 'react';
import {
	ClientLoaderFunctionArgs,
	MetaFunction,
	useLoaderData,
} from '@remix-run/react';
import { findPageDef } from '~/core/logics/menu-defs';
import { useCommonVideosPageHooks } from './_nav.videos';

const { title, Page } = findPageDef('/videos');

export const meta: MetaFunction = () => {
	return [{ title }, { name: 'description', content: title }];
};

export function clientLoader({ params: { hash } }: ClientLoaderFunctionArgs) {
	return { hash };
}

export const useVideosPageWithHashHooks = () => {
	const { hash } = useLoaderData<typeof clientLoader>();
	useCommonVideosPageHooks(hash);
};

export default function VideosPageWithHash() {
	useVideosPageWithHashHooks();
	return <Page />;
}
