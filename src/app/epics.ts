import { combineEpics, Epic } from "redux-observable";
import { ignoreElements } from 'rxjs/operators';

const dummyEpic: Epic = (action$) => action$.pipe(ignoreElements());

export const rootEpic = combineEpics(dummyEpic);
