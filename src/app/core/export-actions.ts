import { Action } from 'redux';
import { filter, firstValueFrom, ignoreElements, Subject, tap } from 'rxjs';

import type { AppAction, Epic } from 'src/app';

const subject = new Subject<AppAction>();
export const exportEpic: Epic = (action$) =>
	action$.pipe(
		tap({
			next: (a) => {
				subject.next(a);
			},
		}),
		ignoreElements()
	);

export const actionsObservable = () => subject.asObservable();
export const waitForAction = async <P>(
	match: (action: Action<unknown>) => action is Action<P>
) => firstValueFrom(actionsObservable().pipe(filter(match)));
