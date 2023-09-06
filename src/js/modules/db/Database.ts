import Dexie from "dexie";
import { ModelTable } from "@/js/modules/db/ModelTable";
import { Music, musicDexieSchema } from "@/js/modules/db/models";

export class Database extends Dexie {
	public readonly musics!: ModelTable<Music>;

	constructor() {
		super("vuelectron-music");

		this.version(1).stores({
			musics: musicDexieSchema,
		});

		this.musics = this.table("musics");
	}
}

export const db = new Database();
