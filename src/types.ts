export type Nullable<T> = NonNullable<T> | null | undefined;

export type PromiseOr<T> = Awaited<T>|Promise<Awaited<T>>;

export enum TableCell {
	TH,
	TD,
}

export type MethodNames<Obj extends object> = ({
	[K in keyof Obj]: Obj[K] extends ((...args: any[]) => any) ? K : never;
})[keyof Obj];
