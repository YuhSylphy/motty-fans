import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from "redux-observable";
import counterReducer from '../features/counter/counterSlice';
import { rootEpic } from './epics';

const dependencies = {};
const epicMiddleware = createEpicMiddleware({
  dependencies
})

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: false
  }).concat([epicMiddleware])
});
epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;
export type Dependencies = typeof dependencies;
