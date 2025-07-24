import { useObservable } from "@vueuse/rxjs";
import { liveQuery } from "dexie";
import { Database, db } from "@/js/modules/db/Database.ts";
import { PromiseOr } from "@/types.ts";
import { Observable } from "rxjs";

export const useDbQuery = <T>(querier: (db: Database) => PromiseOr<T>) => {
	return useObservable(liveQuery<T>(() => querier(db)) as unknown as Observable<T>);
};
