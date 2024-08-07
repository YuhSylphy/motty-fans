import { combineEpics } from 'redux-observable';

import type { Epic } from '~/core';
import { withIndicator } from '~/util';

import { profileActions } from '..';
import { filter } from 'rxjs';
import { fetchProfileDefs } from './fetch';

export const fetchDefsEpic: Epic = (action$) =>
	action$.pipe(
		filter(profileActions.init.match),
		withIndicator('profile/fetch', async () =>
			profileActions.setDefs(await fetchProfileDefs())
		)
	);

export const epic = combineEpics(fetchDefsEpic);
