import { OperatorFunction, ObservableInput, of, defer, concat } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { Dispatch } from 'react';
import { Action, AnyAction } from 'redux';
import { indicatorActions, IndicatorAction } from '..';

const { open, close } = indicatorActions;

export const withIndicator =
	<T extends Action, O extends Action>(
		label: string,
		input: (action: T) => ObservableInput<O | undefined>
	): OperatorFunction<T, O | IndicatorAction> =>
	(action$) =>
		action$.pipe(
			mergeMap((action) =>
				concat(
					of(open(label)),
					defer(() => input(action)).pipe(
						filter(<T>(x: T | undefined): x is T => !!x)
					),
					of(close(label))
				)
			)
		);

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
