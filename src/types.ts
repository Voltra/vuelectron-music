export type Nullable<T> = NonNullable<T> | null | undefined;

export type PromiseOr<T> = Awaited<T>|Promise<Awaited<T>>;

export enum TableCell {
	TH,
	TD,
}

/*export type MethodNames<Obj> = ({
	[K in keyof Obj]: Obj[K] extends ((...args: unknown[]) => unknown) ? K : never;
})[keyof Obj];*/

export type IsStrictlyAny<T> = (T extends never ? true : false) extends false ? false : true;
/** Extract the union of literal method names in T
 */
export type MethodNames<T> = {
	[P in keyof T]: IsStrictlyAny<T[P]> extends true ? never // Plain property of type any (not method)
		: T[P] extends (...args: any[]) => any ? P // a function (method)
			: never;
}[keyof T];
