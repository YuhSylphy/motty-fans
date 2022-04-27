import { combineEpics } from 'redux-observable';
import { filter } from 'rxjs/operators';

import type { Epic } from 'src/app';
import { withIndicator } from 'src/util';

import { videosActions } from '..';
import { fetchVideoDefs } from './fetch';

export const fetchDefsEpic: Epic = (action$) =>
	action$.pipe(
		filter(videosActions.init.match),
		withIndicator('videos/fetch', async () =>
			videosActions.setList(await fetchVideoDefs())
		)
	);

export const epic = combineEpics(fetchDefsEpic);
