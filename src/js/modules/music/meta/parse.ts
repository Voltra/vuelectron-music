import Base64 from "crypto-js/enc-base64";
import sha256 from "crypto-js/sha256";
import { Music } from "@/js/modules/db";
import * as musicMetadata from "music-metadata-browser";
import { IOptions } from "music-metadata-browser";
import { filePathToUrl } from "@/js/modules/tauri/files";
import { formatMusicDuration } from "@/js/modules/music/meta/duration.ts";
import { MusicMeta } from "@/js/modules/music/meta/types.ts";
import { asSequence } from "sequency";
import { compare } from "compary/lib/Comparator";

export const metaToMusic = (musicMeta: MusicMeta): Music => ({
	...musicMeta,
	id: Base64.stringify(sha256(musicMeta.path)),
});

export const parseMusicMeta = async (filePath: string, options: Partial<IOptions> = {
	skipCovers: true,
}): Promise<MusicMeta> => {
	const url = filePathToUrl(filePath);

	const meta = await musicMetadata.fetchFromUrl(url, options);

	const title = meta.common.title
		|| asSequence(Object.entries(meta.native))
			.sortedByDescending(_ => _[0])
			.map(_ => _[1])
			.flatMap(_ => asSequence(_))
			.filter(_ => ["title", "tit1", "tit2"].includes(_.id.toLowerCase()))
			.filter(_ => !!_.value)
			.map(_ => _.value as string)
			.first();

	return {
		path: url,
		title,
		artist: meta.common.artist ?? "",
		duration: meta.format.duration ? formatMusicDuration(meta.format.duration) : "",
		durationSeconds: meta.format.duration ?? 0,
		genre: meta.common.genre?.join(", ") ?? "",
		album: meta.common.album ?? "",
	};
};
export const parseMusic = async (path: string): Promise<Music> => {
	const meta = await parseMusicMeta(path);
	return metaToMusic(meta);
};
