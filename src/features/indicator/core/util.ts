import {
	OperatorFunction,
	ObservableInput,
	ObservedValueOf,
	of,
	defer,
	concat,
} from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Dispatch } from 'react';
import { Action, AnyAction } from 'redux';
import { indicatorActions, IndicatorAction } from '..';

const { open, close } = indicatorActions;
// export const withIndicator = <T extends Action>(
//   label: string
// ): OperatorFunction<T, T | IndicatorAction> => (action$) =>
//   action$.pipe(startWith(open(label)), endWith(close(label)));
export const withIndicator =
	<T extends Action, O extends ObservableInput<Action>>(
		label: string,
		input: (action: T) => O
	): OperatorFunction<T, ObservedValueOf<O> | IndicatorAction> =>
	(action$) =>
		action$.pipe(
			mergeMap((action) =>
				concat(
					of(open(label)),
					defer(() => input(action)),
					of(close(label))
				)
			)
		);
//   action$.pipe(
//     mergeMap((action) =>
//       concat(
//         of(open(label)),
//         defer(() => input(action)),
//         of(endWith(close(label)))
//       )
//     )
//   );

export const withIndicatorSync =
	(dispatch: Dispatch<AnyAction>) =>
	(label: string) =>
	<R>(func: () => R) => {
		try {
			dispatch(open(label));
			return func();
		} finally {
			dispatch(close(label));
		}
	};

export const withIndicatorAsync =
	(dispatch: Dispatch<AnyAction>) =>
	(label: string) =>
	<R>(func: () => PromiseLike<R>) => {
		return new Promise(() => {
			dispatch(open(label));
		})
			.then(func)
			.finally(() => {
				dispatch(close(label));
			});
	};
