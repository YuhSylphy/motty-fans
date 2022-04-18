import { combineEpics } from 'redux-observable';
import { filter } from 'rxjs/operators';

import type { Epic } from 'src/app';
import { withIndicator } from 'src/util';

import { videosActions } from '..';
import { dummyVideoDefs } from './logic';

export const fetchDefsEpic: Epic = (action$) =>
	action$.pipe(
		filter(videosActions.init.match),
		withIndicator('videos/fetch', async () =>
			videosActions.set(await dummyVideoDefs())
		)
	);

export const epic = combineEpics(fetchDefsEpic);
