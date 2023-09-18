import { defineStore } from "pinia";
import { Music } from "@/js/modules/db";
import { shuffleArray } from "@/js/utils/array.ts";
import { Nullable } from "@/types.ts";
import { asSequence } from "sequency";

export const useCurrentPlaylist = defineStore("currentPlaylist", {
	state() {
		return {
			activeId: null as Nullable<Music["id"]>,
			songs: [] as Music[],
		};
	},
	getters: {
		currentMusic(): Nullable<Music> {
			return this.songs.find(({ id }) => id === this.activeId);
		},
	},
	actions: {
		setActiveSong(song: Music) {
			const { id } = song;
			const hasSong = this.songs.find(ssong => ssong.id === id);

			if (hasSong) {
				this.activeId = id;
			}
		},
		setSongs(songs: Music[]) {
			this.songs = songs;
		},
		shuffle() {
			this.songs = shuffleArray(this.songs);
		},
		applySort(sortingFn: (lhs: Music, rhs: Music) => number) {
			this.setSongs(
				asSequence(this.songs)
					.sortedWith(sortingFn)
					.toArray()
			);
		}
	},
});
