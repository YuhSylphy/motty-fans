import React, { useEffect, useState } from 'react';
import { MetaFunction } from '@remix-run/react';
import { findPageDef } from '~/core/logics/menu-defs';
import { useAppDispatch } from '~/core';
import { coreActions } from '~/core/logics/ducks';

const { title, Page } = findPageDef('/hash-testing');

export const meta: MetaFunction = () => {
	return [{ title }, { name: 'description', content: title }];
};

const useHashTestingHooks = () => {
	const dispatch = useAppDispatch();
	const [initialized, setInitialized] = useState(false);
	useEffect(() => {
		if (initialized) return;
		dispatch(coreActions.setTitle(title));
		setInitialized(true);
	}, [dispatch, initialized, setInitialized]);
};

export default function HashTestingPage() {
	useHashTestingHooks();
	return <Page />;
}