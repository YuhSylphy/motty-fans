import { combineEpics } from 'redux-observable';
import { filter } from 'rxjs/operators';

import { DateTime } from 'luxon';

import type { Epic } from 'src/app';
import { withIndicator } from 'src/util';

import { videosActions } from '..';
import { fetchVideoDefs } from './fetch/videos';

export const fetchDefsEpic: Epic = (action$) =>
	action$.pipe(
		filter(videosActions.init.match),
		withIndicator('videos/fetch', async () =>
			videosActions.setList(await fetchVideoDefs())
		)
	);

export const setDefaultConditionEpic: Epic = (action$) =>
	action$.pipe(
		filter(videosActions.init.match),
		withIndicator('videos/default-condition', async () =>
			videosActions.setConditionDateFrom(
				DateTime.now().minus({ months: 3 }).toMillis()
			)
		)
	);

export const epic = combineEpics(fetchDefsEpic, setDefaultConditionEpic);
