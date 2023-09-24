import { usePlayer } from "@/js/modules/player/usePlayer";
import { useCurrentPlaylist } from "@/vue/stores/currentPlaylist";
import { Music } from "@/js/modules/db";
import { usePreferences } from "@/vue/stores/preferences.ts";

export const usePlaylistController = (player: ReturnType<typeof usePlayer>, playlist: ReturnType<typeof useCurrentPlaylist>) => {
	const preferences = usePreferences();

	const getPlayer = () => player.value!;

	/**
	 * Toggle the play state of the given music (plays the music if it wasn't the active song)
	 * @param music
	 */
	const toggleMusic = async (music: Music) => {
		const player = getPlayer();

		if (playlist.activeId === music.id) {
			return player.togglePlay();
		} else {
			// const wasPlaying = player.value?.isPlaying.value ?? !currentPlaylist.activeId;

			playlist.setActiveSong(music);
			return player.playMusic(music, {
				play: true,
			});
		}
	};

	/**
	 * Toggle the play state of the currently active music (plays the first music if there were none)
	 */
	const togglePlay = async () => {
		if (playlist.activeId) {
			return getPlayer().togglePlay();
		} else {
			return toggleMusic(playlist.songs[0]);
		}
	};

	/**
	 * Play the next song according to the loop strategy
	 */
	const playNext = async () => {
		const player = getPlayer();

		if (!playlist.activeId) {
			const music = playlist.songs[0];
			playlist.setActiveSong(music);
			return player.playMusic(music, {
				play: true,
			});
		}

		const activeIndex = playlist.currentMusicIndex!;
		const nextIndex = preferences.loopStrategy.chooseNextSong(playlist.songs, activeIndex);

		if (nextIndex === activeIndex) {
			player.seek(0);
			return player.play();
		}

		if (typeof nextIndex === "number") {
			return toggleMusic(playlist.songs[nextIndex]);
		}

		return player.pause();
	};

	/**
	 * Play the next song in sequential (and circular) order
	 */
	const playSequentiallyNext = async () => {
		playlist.moveToSequentiallyNextSong();
		return getPlayer().playMusic(playlist.currentMusic, {
			play: true,
		});
	};

	/**
	 * Play the previous song in sequential (and circular) order
	 */
	const playSequentiallyPrev = async () => {
		playlist.moveToSequentiallyPreviousSong();
		return getPlayer().playMusic(playlist.currentMusic, {
			play: true,
		});
	};

	return {
		toggleMusic,
		togglePlay,
		playNext,
		playSequentiallyNext,
		playSequentiallyPrev,
	};
};
