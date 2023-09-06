import { Table } from "dexie";
import { Model } from "@/js/modules/db/Model.ts";

export type ModelTable<ModelClass extends Model> = Table<ModelClass, ModelClass["id"]>;
