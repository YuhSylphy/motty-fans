import { combineEpics } from 'redux-observable';
import { filter } from 'rxjs/operators';

import type { Epic } from '~/core';
import { withIndicator } from '~/util';

import { horseDefsActions } from '..';
import { fetchHorseDefs } from './horse';

export const fetchDefsEpic: Epic = (action$) =>
	action$.pipe(
		filter(horseDefsActions.init.match),
		withIndicator('horse-defs/fetch', async () =>
			horseDefsActions.set({ list: await fetchHorseDefs() })
		)
	);

export const epic = combineEpics(fetchDefsEpic);
