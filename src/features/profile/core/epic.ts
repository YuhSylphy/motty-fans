import { combineEpics } from 'redux-observable';

import type { Epic } from 'src/app';
// import { withIndicator } from 'src/util';

// import { profileActions } from '..';
import { NEVER } from 'rxjs';

// export const fetchDefsEpic: Epic = (action$) =>
// 	action$.pipe(
// 		filter(videosActions.init.match),
// 		withIndicator('videos/fetch', async () =>
// 			videosActions.setList(await fetchVideoDefs())
// 		)
// 	);

// export const setDefaultConditionEpic: Epic = (action$) =>
// 	action$.pipe(
// 		filter(videosActions.init.match),
// 		withIndicator('videos/default-condition', async () =>
// 			videosActions.setConditionDateFrom(
// 				DateTime.now().minus({ months: 3 }).toMillis()
// 			)
// 		)
// 	);

const dummyEpic: Epic = (_action$) => NEVER;

export const epic = combineEpics(dummyEpic);
