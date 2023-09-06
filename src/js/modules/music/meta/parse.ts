import Base64 from "crypto-js/enc-base64";
import sha256 from "crypto-js/sha256";
import { Music } from "@/js/modules/db";
import * as musicMetadata from "music-metadata-browser";
import { IOptions } from "music-metadata-browser";
import { filePathToUrl } from "@/js/modules/tauri/files";
import { formatMusicDuration } from "@/js/modules/music/meta/duration.ts";
import { MusicMeta } from "@/js/modules/music/meta/types.ts";

export const metaToMusic = (musicMeta: MusicMeta): Music => ({
	...musicMeta,
	id: Base64.stringify(sha256(musicMeta.path)),
});

export const parseMusicMeta = async (filePath: string, options: Partial<IOptions> = {
	skipCovers: true,
}): Promise<MusicMeta> => {
	const url = filePathToUrl(filePath);

	const meta = await musicMetadata.fetchFromUrl(url, options);

	return {
		path: url,
		title: meta.common.title ?? "",
		artist: meta.common.artist ?? "",
		duration: meta.format.duration ? formatMusicDuration(meta.format.duration) : "",
		genre: meta.common.genre?.join(", ") ?? "",
		album: meta.common.album ?? "",
	};
};
export const parseMusic = async (path: string): Promise<Music> => {
	const meta = await parseMusicMeta(path);
	return metaToMusic(meta);
};
