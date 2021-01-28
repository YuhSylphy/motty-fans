import { combineEpics } from 'redux-observable';
import { filter } from 'rxjs/operators';

import type { Epic } from 'src/app';
import { withIndicator } from 'src/util';

import { changeLogActions } from '..';
import { fetchChangeLogs } from './logic';

export const fetchDefsEpic: Epic = (action$) =>
	action$.pipe(
		filter(changeLogActions.init.match),
		withIndicator('change-logs/fetch', async () =>
			changeLogActions.set(await fetchChangeLogs())
		)
	);

export const epic = combineEpics(fetchDefsEpic);
