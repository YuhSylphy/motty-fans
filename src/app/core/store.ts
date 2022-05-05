import { configureStore } from '@reduxjs/toolkit';

import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { coreReducer } from 'src/app/core/ducks';
import { horseDefsReducer } from 'src/features/horse-defs';
import { indicatorReducer } from 'src/features/indicator';
import { pedigreeReducer } from 'src/features/pedigree';
import { changeLogReducer } from 'src/features/changelog';
import { videosReducer } from 'src/features/videos';

import type { AppAction } from './actions';

const dependencies = {};
const epicMiddleware = createEpicMiddleware<
	AppAction,
	AppAction,
	void,
	Dependencies
>({
	dependencies,
});

export const store = configureStore({
	reducer: {
		core: coreReducer,
		horseDefs: horseDefsReducer,
		indicator: indicatorReducer,
		pedigree: pedigreeReducer,
		changeLog: changeLogReducer,
		videos: videosReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: false,
		}).concat([epicMiddleware]),
});

export type Dependencies = typeof dependencies;
export type Epic = Parameters<typeof epicMiddleware.run>[0];
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const epics = new Set<Epic>();
export const registerEpic = (...es: Epic[]) => {
	es.forEach((e) => epics.add(e));
	epicMiddleware.run(combineEpics(...Array.from(epics.values())));
};
