import { usePlayer } from "@/js/modules/player/usePlayer";
import { useCurrentPlaylist } from "@/vue/stores/currentPlaylist";
import { Music } from "@/js/modules/db";
import { watchExtractedObservable } from "@/vue/composables/rx.ts";

export const usePlaylistController = (player: ReturnType<typeof usePlayer>, playlist: ReturnType<typeof useCurrentPlaylist>, { passive = false } = {}) => {
	const getPlayer = () => player.value!;

	const toggleMusic = async (music: Music) => {
		if (playlist.activeId === music.id) {
			return getPlayer().togglePlay();
		} else {
			// const wasPlaying = player.value?.isPlaying.value ?? !currentPlaylist.activeId;

			playlist.setActiveSong(music);
			return getPlayer().playMusic(music, {
				play: true,
			})
		}
	};

	const playNext = async () => {
		if (!playlist.activeId) {
			const music = playlist.songs[0];
			playlist.setActiveSong(music);
			return getPlayer().playMusic(music, {
				play: true,
			})
		} else {
			//TODO: Use preferences and loop settings to know how to handle this case (might become multiple cases)

			const currentIndex = playlist.songs.findIndex(song => playlist.activeId === song.id);
			const nextIndex = (currentIndex + 1) % playlist.songs.length;
			return toggleMusic(playlist.songs[nextIndex]);
		}
	};

	if (!passive) {
		watchExtractedObservable(player, _ => _.reachEnd$, playNext);
	}

	return {
		toggleMusic,
		playNext,
	};
};
