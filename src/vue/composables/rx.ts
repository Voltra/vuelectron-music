import { Ref, WatchSource } from "vue";
import type { Nullable } from "@/types";
import { Observable, Subject, Subscription } from "rxjs";
import { useObservable, UseObservableOptions } from "@vueuse/rxjs";
import { call } from "tinycolor2";

//TODO: Propose those to @vue-use/rxjs

export const watchExtractedObservable = <T, E>(source: WatchSource<Nullable<T>>, extractor: (value: NonNullable<T>) => Observable<E>, callback: (snapshot: E) => void) => {
	let subscription: Subscription|undefined;

	watch(source, (value) => {
		subscription?.unsubscribe();
		const observable = extractor(value);
		subscription = observable.subscribe({
			next: callback,
		});
	});

	onBeforeUnmount(() => subscription?.unsubscribe());
};

export const useExtractedObservable = <T, E, I = undefined>(source: WatchSource<Nullable<T>>, extractor: (value: NonNullable<T>) => Observable<E>, options?: UseObservableOptions<I> = undefined) => {
	const subject = new Subject<E>();
	let subscription: Subscription|undefined;

	watch(source, (value) => {
		subscription?.unsubscribe();
		const observable = extractor(value);
		subscription = observable.subscribe(subject);
	});

	onBeforeUnmount(() => {
		subject.unsubscribe();
		subscription?.unsubscribe();
	});

	return useObservable(subject, options);
};
