import { configureStore } from '@reduxjs/toolkit';

import { ReducerState } from 'react';

import { combineEpics, createEpicMiddleware } from 'redux-observable';

import type { AppAction } from './actions';

import { coreReducer } from '~/core/logics/ducks';
import { horseDefsReducer } from '~/features/horse-defs';
import { indicatorReducer } from '~/features/indicator';
import { pedigreeReducer } from '~/features/pedigree';
import { changeLogReducer } from '~/features/changelog';
import { videosReducer } from '~/features/videos';
import { profileReducer } from '~/features/profile';
import { liveSeriesReducer } from '~/features/live-series';

const reducer = {
	core: coreReducer,
	horseDefs: horseDefsReducer,
	indicator: indicatorReducer,
	pedigree: pedigreeReducer,
	changeLog: changeLogReducer,
	videos: videosReducer,
	profile: profileReducer,
	liveSeries: liveSeriesReducer,
};

export type RootState = {
	[K in keyof typeof reducer]: ReducerState<(typeof reducer)[K]>;
};

const dependencies = {};
const epicMiddleware = createEpicMiddleware<
	AppAction,
	AppAction,
	RootState,
	Dependencies
>({
	dependencies,
});

export const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: false,
		}).concat([epicMiddleware]),
});

export type Dependencies = typeof dependencies;
export type Epic = Parameters<typeof epicMiddleware.run>[0];
export type AppDispatch = typeof store.dispatch;

const epics = new Set<Epic>();
export const registerEpic = (...es: Epic[]) => {
	es.forEach((e) => epics.add(e));
	epicMiddleware.run(combineEpics(...Array.from(epics.values())));
};
