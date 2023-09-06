export type Nullable<T> = NonNullable<T> | null | undefined;

export type PromiseOr<T> = Awaited<T>|Promise<Awaited<T>>;

export enum TableCell {
	TH,
	TD,
}
