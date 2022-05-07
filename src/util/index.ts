import { useMemo } from 'react';
import { Theme, useMediaQuery } from '@mui/material';
import { Breakpoint } from '@mui/system';

export { withIndicator, withIndicatorSync } from 'src/features/indicator';
export { useAppDispatch, useAppSelector } from 'src/app';
export { actionsObservable, waitForAction } from 'src/app/core/export-actions';

export const withDefault =
	<T>(guard: (arg: unknown) => arg is T, defaultValue: T) =>
	(target: unknown) =>
		guard(target) ? target : defaultValue;

const breakpoints: readonly Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];
export const isBreakpoint = (
	(list: readonly string[]) =>
	(target: unknown): target is Breakpoint =>
		typeof target === 'string' && list.includes(target)
)(breakpoints);

export const useValueWithMediaQuery = <T>(dict: { [K in Breakpoint]: T }) => {
	const xs = useMediaQuery<Theme>((theme) => theme.breakpoints.only('xs'));
	const sm = useMediaQuery<Theme>((theme) => theme.breakpoints.only('sm'));
	const md = useMediaQuery<Theme>((theme) => theme.breakpoints.only('md'));
	const lg = useMediaQuery<Theme>((theme) => theme.breakpoints.only('lg'));
	const xl = useMediaQuery<Theme>((theme) => theme.breakpoints.only('xl'));

	return useMemo(
		() =>
			dict[
				withDefault(
					isBreakpoint,
					'xs'
				)(
					Object.entries({ xs, sm, md, lg, xl }).find(([, value]) => value)?.[0]
				)
			],
		[xs, sm, md, lg, xl]
	);
};
