import { useCurrentPlaylist } from "@/vue/stores/currentPlaylist";
import { usePlayer } from "./usePlayer";
import { usePlaylistController } from "./usePlaylistController";

export const useCurrentPlaylistController = () => {
	const player = usePlayer();
	const playlist = useCurrentPlaylist();
	return usePlaylistController(player, playlist);
};
