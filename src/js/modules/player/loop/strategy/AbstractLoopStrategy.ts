import { Music } from "@/js/modules/db";

export interface NextSongPick {
	index?: number;
	shouldEmptyPlayerFirst?: boolean;
}

export abstract class AbstractLoopStrategy {
	/**
	 * @param songs - The list of songs to pick from
	 * @param activeIndex - The ID of the active song (precondition 0 <= activeIndex < songs.length)
	 * @return the index of the next song to play
	 */
	public abstract chooseNextSong(songs: Music[], activeIndex: number): number|undefined;

	protected activeMusicIndex(songs: Music[], activeId: Music["id"]): number {
		return songs.findIndex(music => music.id === activeId)!;
	}
}
