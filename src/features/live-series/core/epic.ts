import { combineEpics } from 'redux-observable';
import { filter } from 'rxjs/operators';

// import { DateTime } from 'luxon';

import type { Epic } from 'src/app';
import { withIndicator } from 'src/util';

import { liveSeriesActions } from '..';
import { fetchLiveSeries } from './fetch';

export const fetchDefEpic: Epic = (action$) =>
	action$.pipe(
		filter(liveSeriesActions.init.match),
		withIndicator('live-series/init', async () => {
			const series = await fetchLiveSeries();
			return liveSeriesActions.setSeries({ series });
		})
	);

export const epic: Epic = combineEpics(fetchDefEpic);
