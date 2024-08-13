type Guard<R> = (arg: unknown) => arg is R;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function compositeTypeGuards<T extends readonly any[]>(
	...guards: { [K in keyof T]: Guard<T[K]> }
): Guard<T[number]> {
	return guards.reduceRight(
		(composition, guard) => (arg: unknown) => composition(arg) || guard(arg),
		(arg: unknown): arg is never => false
	);
}
