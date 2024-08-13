import { combineEpics } from 'redux-observable';
import {
	catchError,
	filter,
	ignoreElements,
	mergeMap,
	tap,
} from 'rxjs/operators';

import type { Epic } from '~/core';
import { withIndicator } from '~/util';

import { videosActions } from '..';
import { fetchVideoDefs } from './fetch/videos';
import { compositeTypeGuards } from '~/core/utils';
import {
	decodeConditionsHash,
	encodeConditionsHash,
	setHashToQueryParams,
} from './hash';
import { EMPTY } from 'rxjs';

export const fetchDefsEpic: Epic = (action$) =>
	action$.pipe(
		filter(videosActions.init.match),
		withIndicator('videos/fetch', async () =>
			videosActions.setList(await fetchVideoDefs())
		)
	);

/**
 * URLからハッシュを取り出した場合に展開して条件設定
 * @param action$
 * @param state$
 * @returns
 */
export const acceptHashEpic: Epic = (action$, state$) =>
	action$.pipe(
		filter(videosActions.acceptHash.match),
		withIndicator(
			'videos/accept-hash',
			async ({ payload: { hash: accepted } }) => {
				const {
					videos: { hash: stored },
				} = state$.value;
				if (!!accepted && stored !== accepted) {
					const condition = decodeConditionsHash(accepted);
					return videosActions.setConitionFromAccepted({
						condition,
						hash: accepted,
					});
				}
			}
		)
	);

/**
 * 条件変更時にhashを計算して設定
 * @param action$
 * @param state$
 * @returns
 */
export const conditionChangedEpic: Epic = (action$, state$) =>
	action$.pipe(
		filter(
			compositeTypeGuards(
				videosActions.addConditionTags.match,
				videosActions.removeConditionTags.match,
				videosActions.clearConditionTags.match,

				videosActions.setConditionDateFrom.match,
				videosActions.setConditionDateTo.match,
				videosActions.clearConditionDateFrom.match,
				videosActions.clearConditionDateTo.match
			)
		),
		mergeMap(async () => {
			const {
				videos: { condition, hash: stored },
			} = state$.value;
			const hash = encodeConditionsHash(condition);
			if (hash !== stored) {
				return videosActions.setHash({ hash });
			}
		}),
		filter((x) => !!x),
		catchError((e) => {
			console.warn('failed to construct hash', e);
			return EMPTY;
		})
	);

/**
 * hash設定時にURLに反映
 * @param action$
 * @returns
 */
export const hashToQueryParameterEpic: Epic = (action$) =>
	action$.pipe(
		filter(videosActions.setHash.match),
		tap(({ payload: { hash } }) => {
			if (!hash) return;

			setHashToQueryParams(hash);
		}),
		ignoreElements()
	);

export const epic = combineEpics(
	fetchDefsEpic,
	acceptHashEpic,
	conditionChangedEpic,
	hashToQueryParameterEpic
);
