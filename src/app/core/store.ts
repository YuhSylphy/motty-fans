import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { horseDefsReducer, horseDefsEpic } from 'src/features/horse-defs';
import { indicatorReducer } from 'src/features/indicator';
import { pedigreeReducer } from 'src/features/pedigree';
import { changeLogReducer, changeLogEpic } from 'src/features/changelog';

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

export type Dependencies = typeof dependencies;
export type Epic = Parameters<typeof epicMiddleware.run>[0];
export type RootState = ReturnType<typeof store.getState>;

const epics: Epic[] = [];
export const registerEpic = (...es: Epic[]) => {
	epics.push(...es);
	epicMiddleware.run(combineEpics(...epics));
};

registerEpic(horseDefsEpic, changeLogEpic);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
