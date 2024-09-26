import { combineEpics } from 'redux-observable';
import { debounceTime, filter, map } from 'rxjs/operators';

// import { DateTime } from 'luxon';

import type { Epic } from '~/core';
import { withIndicator } from '~/util';

import { liveSeriesActions } from '..';
import { fetchLiveSeries } from '~/features/videos/core/fetch/liveSeries';
import { mapLiveSeriesToRecord } from './logic';

export const fetchDefEpic: Epic = (action$) =>
	action$.pipe(
		filter(liveSeriesActions.init.match),
		withIndicator('live-series/init', async () => {
			const series = await fetchLiveSeries();
			const records = series.map(mapLiveSeriesToRecord);
			return liveSeriesActions.setRecords({ records });
		})
	);

export const defaultDisplayRecordsEpic: Epic = (action$) =>
	action$.pipe(
		filter(liveSeriesActions.setRecords.match),
		map(({ payload: { records } }) =>
			liveSeriesActions.setDisplayRecords({ displayRecords: records })
		)
	);

const debounceTimeMillis = 250;

export const filterWithConditionEpic: Epic = (action$, state$) =>
	action$.pipe(
		filter(liveSeriesActions.setConditionText.match),
		debounceTime(debounceTimeMillis),
		withIndicator(
			'filterWithConditionEpic',
			async ({ payload: { conditionText } }) => {
				const {
					value: {
						liveSeries: { records },
					},
				} = state$;

				const displayRecords = (() => {
					// 条件なしは元のリストそのまま
					if (!conditionText) {
						return records;
					}
					// TODO: クォートなどの機能追加
					const words = conditionText
						.split(' ')
						.map((x) => x.trim())
						.filter((x) => x !== '');

					return records.filter(
						({
							amount,
							href,
							id,
							// masteryLevel, // ★に変換して実施
							// part1, // (サムネ周りは無視)
							platform,
							remarks,
							styles,
							title,
							titleReleasedIn,
						}) =>
							words.includes(`${amount}`) ||
							words.includes(`${titleReleasedIn}`) ||
							[href, id, platform, remarks, ...styles, title].some((str) =>
								words.some((word) => str?.includes(word))
							)
					);
				})();

				return liveSeriesActions.setDisplayRecords({
					displayRecords,
				});
			}
		)
	);

export const epic: Epic = combineEpics(
	fetchDefEpic,
	defaultDisplayRecordsEpic,
	filterWithConditionEpic
);
