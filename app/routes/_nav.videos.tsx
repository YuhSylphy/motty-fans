import React, { useEffect, useState } from 'react';
import { MetaFunction, Outlet } from '@remix-run/react';
import { findPageDef } from '~/core/logics/menu-defs';
import { useAppDispatch, useAppSelector } from '~/core';
import {
	createDefaultConditionHash,
	setHashToQueryParams,
} from '~/features/videos/core/hash';
import { videosActions } from '~/features/videos';
import { coreActions } from '~/core/logics/ducks';

const { title } = findPageDef('/videos');

export const meta: MetaFunction = () => {
	return [{ title }, { name: 'description', content: title }];
};

function createDefaultConditionHashWithQueryParams() {
	const hash = createDefaultConditionHash();
	setHashToQueryParams(hash);
	return hash;
}

export const useCommonVideosPageHooks = (
	loadedHash: string | undefined = undefined
) => {
	const dispatch = useAppDispatch();
	const [initialized, setInitialized] = useState(false);
	useEffect(() => {
		if (initialized) return;
		dispatch(coreActions.setTitle(title));
		setInitialized(true);
	}, [dispatch, initialized, setInitialized]);

	const accepted = loadedHash ?? createDefaultConditionHashWithQueryParams();
	const stored = useAppSelector(({ videos: { hash } }) => hash);

	useEffect(() => {
		if (!stored) {
			dispatch(videosActions.acceptHash({ hash: accepted }));
		}
	}, [dispatch, accepted, stored]);
};

export default function VideosPage() {
	return <Outlet />;
}
