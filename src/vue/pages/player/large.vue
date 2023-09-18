<template>
	<main class="desktopPlayer">
		<Playlist
			:playing="isPlaying"
			:activeId="currentPlaylist.activeId"
			:songs="currentPlaylist.songs"
			@toggleMusic="playlistController.toggleMusic"
			@sort="currentPlaylist.applySort"
		/>
		<DesktopPlayerBar/>
	</main>
</template>

<script setup lang="ts">
	import { useCurrentPlaylist } from "@/vue/stores/currentPlaylist";
	import DesktopPlayerBar from "@/vue/components/PlayerBar/DesktopPlayerBar.vue";
	import Playlist from "@/vue/components/Playlist/Playlist.vue";
	import { usePlayer } from "@/js/modules/player";
	import { usePlaylistController } from "@/js/modules/player/usePlaylistController";
	import { syncPlayerControls } from "@/js/modules/player/syncPlayerControls";

	definePage({
		name: "desktopPlayer",
	});

	const router = useRouter();
	const currentPlaylist = useCurrentPlaylist();
	const player = usePlayer();
	const playlistController = usePlaylistController(player, currentPlaylist);

	const isPlaying = computed(() => player.value?.isPlaying?.value ?? false);

	syncPlayerControls(player, playlistController);

	watch(() => currentPlaylist.songs, newValue => {
		if (newValue.length === 0) {
			router.push("/drag-drop");
		}
	});
</script>
