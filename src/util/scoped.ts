export {};

declare global {
	interface Object {
		let<T, R>(this: T, block: (_: T) => R): R;
		letAsync<T, R>(this: T, block: (_: T) => Promise<R>): Promise<R>;
	}
	interface Array<T> {
		let<R>(this: T[], block: (_: T[]) => R): R;
		letAsync<R>(this: T[], block: (_: T[]) => Promise<R>): Promise<R>;

		takeWhile<R extends T>(
			this: T[],
			block: (elem: T, index: number, obj: T[]) => elem is R
		): R[];
		takeWhile(
			this: T[],
			block: (elem: T, index: number, obj: T[]) => boolean
		): T[];
	}
}

Object.prototype.let = function <T, R>(this: T, block: (_: T) => R): R {
	return block(this);
};

Object.prototype.letAsync = async function <T, R>(
	this: T,
	block: (_: T) => Promise<R>
): Promise<R> {
	return await block(this);
};

Array.prototype.let = function <T, R>(this: T[], block: (_: T[]) => R): R {
	return block(this);
};

Array.prototype.letAsync = async function <T, R>(
	this: T[],
	block: (_: T[]) => Promise<R>
): Promise<R> {
	return await block(this);
};

Array.prototype.takeWhile = function takeWhile<T, R extends T>(
	this: T[],
	block: (elem: T, index: number, obj: T[]) => elem is R
): R[] {
	const index = this.findIndex((e, ix, obj) => !block(e, ix, obj));
	return this.slice(0, index) as R[];
};
