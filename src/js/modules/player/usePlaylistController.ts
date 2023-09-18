import { usePlayer } from "@/js/modules/player/usePlayer";
import { useCurrentPlaylist } from "@/vue/stores/currentPlaylist";
import { Music } from "@/js/modules/db";
import { usePreferences } from "@/vue/stores/preferences.ts";

export const usePlaylistController = (player: ReturnType<typeof usePlayer>, playlist: ReturnType<typeof useCurrentPlaylist>) => {
	const preferences = usePreferences();

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

	const togglePlay = async () => {
		if (playlist.activeId) {
			return getPlayer().togglePlay();
		} else {
			return toggleMusic(playlist.songs[0]);
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
			const activeIndex = playlist.songs.findIndex(music => music.id === playlist.activeId)!;
			const nextIndex = preferences.loopStrategy.chooseNextSong(playlist.songs, activeIndex);

			if (nextIndex === activeIndex) {
				await getPlayer().seek(0);
				return getPlayer().play();
			}

			if (typeof nextIndex === "number") {
				return toggleMusic(playlist.songs[nextIndex]);
			} else {
				return getPlayer().pause();
			}
		}
	};

	return {
		toggleMusic,
		togglePlay,
		playNext,
	};
};
