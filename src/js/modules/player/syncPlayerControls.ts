import { usePlayer } from "@/js/modules/player/usePlayer";
import { usePlaylistController } from "@/js/modules/player/usePlaylistController";
import { watchExtractedObservable } from "@/vue/composables/rx";

export const syncPlayerControls = (player: ReturnType<typeof usePlayer>, playlistController: ReturnType<typeof usePlaylistController>) => {
	watchExtractedObservable(player, _ => _.reachEnd$, playlistController.playNext);
};
