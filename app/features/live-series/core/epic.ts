import { combineEpics } from 'redux-observable';
import { filter } from 'rxjs/operators';

// import { DateTime } from 'luxon';

import type { Epic } from '~/core';
import { withIndicator } from '~/util';

import { liveSeriesActions } from '..';
import { fetchLiveSeries } from '~/features/videos/core/fetch/liveSeries';

export const fetchDefEpic: Epic = (action$) =>
	action$.pipe(
		filter(liveSeriesActions.init.match),
		withIndicator('live-series/init', async () => {
			const series = await fetchLiveSeries();
			return liveSeriesActions.setSeries({ series });
		})
	);

export const epic: Epic = combineEpics(fetchDefEpic);
