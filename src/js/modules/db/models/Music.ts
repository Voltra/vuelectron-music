import { Model, modelDexieSchema } from "@/js/modules/db/Model.ts";

import type { MusicMeta } from "@/js/modules/music/meta/types";

export interface Music extends Model, MusicMeta {
	id: string;
}

export const musicDexieSchema = `${modelDexieSchema}, path, title, artist, duration, durationSeconds, genre, album`;

