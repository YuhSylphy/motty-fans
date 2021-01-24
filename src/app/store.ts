import { configureStore } from '@reduxjs/toolkit';
import { Action } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { horseDefsReducer, horseDefsEpic } from '../features/horse-defs';
import { indicatorReducer } from '../features/indicator';
import { pedigreeReducer } from '../features/pedigree';
import { changeLogReducer, changeLogEpic } from '../features/changelog';

const dependencies = {};
const epicMiddleware = createEpicMiddleware<
	Action,
	Action,
	void,
	typeof dependencies
>({
	dependencies,
});

export const store = configureStore({
	reducer: {
		horseDefs: horseDefsReducer,
		indicator: indicatorReducer,
		pedigree: pedigreeReducer,
		changeLog: changeLogReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: false,
		}).concat([epicMiddleware]),
});

epicMiddleware.run(combineEpics(horseDefsEpic, changeLogEpic));

export type RootState = ReturnType<typeof store.getState>;
export type Dependencies = typeof dependencies;
