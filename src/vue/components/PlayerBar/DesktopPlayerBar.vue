<template>
	<nav class="desktopPlayerBar">
		<div class="_part -side">
			<button class="material-icons" @click="playlistController.togglePlay">
				{{ playIcon }}
			</button>
		</div>
		<div class="_part -main">
			<h2>
				{{ songName }}
			</h2>
			<PlayerProgressBar @progress="player?.seek($event)"/>
			<div class="">
				<span>{{ startTime }}</span>
				<span>{{ artist }}</span>
				<span>{{ endTime }}</span>
			</div>
		</div>
		<div class="_part -side">
			<button class="material-icons" @click="playlist.shuffle">
				shuffle
			</button>

			<button :class="loopClasses" @click="preferences.nextMode">
				{{ preferences.loopIcon }}
			</button>
		</div>
	</nav>
</template>

<script setup lang="ts">
	import PlayerProgressBar from "@/vue/components/PlayerBar/PlayerProgressBar.vue";
	import { usePlayer } from "@/js/modules/player";
	import { computed } from "vue";
	import { useCurrentPlaylist } from "@/vue/stores/currentPlaylist.ts";
	import { usePreferences } from "@/vue/stores/preferences.ts";
	import { usePlaylistController } from "@/js/modules/player/usePlaylistController.ts";
	import { useExtractedObservable } from "@/vue/composables/rx.ts";
	import { formatMusicDuration } from "@/js/modules/music/meta";

	const playlist = useCurrentPlaylist();
	const player = usePlayer();
	const preferences = usePreferences();
	const playlistController = usePlaylistController(player, playlist);
	const progressNum = useExtractedObservable(player, _ => _.progress$);

	const startTime = computed(() => {
		if (playlist.currentMusic) {
			return formatMusicDuration(
				Math.round(playlist.currentMusic!.durationSeconds * progressNum.value!)
			);
		} else {
			return "0:00";
		}
	});
	const endTime = computed(() => playlist.currentMusic?.duration ?? "--:--");
	const songName = computed(() => playlist.currentMusic?.title ?? "");
	const artist = computed(() => playlist.currentMusic?.artist ?? "");
	const loopClasses = computed(() => ({
		"material-icons": true,
		"-active": preferences.isLooping,
		"-single": preferences.loopingSingle,
	}));

	const playIcon = computed(() => player.value?.isPlaying.value ? "pause" : "play_arrow");
</script>

<style lang="scss" scoped>
	@use "@/scss/variables" as *;

	.desktopPlayerBar {
		display: flex;
		justify-content: space-between;
		align-items: stretch;
		width: $desktopPlayerBarWidth;
		height: $desktopPlayerBarHeight;

		background-color: $bg;
		box-shadow: $topShadow;

		&:hover {
			background-color: $bgDark;

			& > ._part.-side {
				background-color: $bgDark;
			}
		}

		& > ._part {
			$sideWidth: 12.5%;
			$mainWidth: 100% - 2*$sideWidth;

			height: 100%;

			&.-side {
				position: relative;
				width: $sideWidth;
				background-color: $bg;
				display: flex;
				justify-content: center;
				align-items: center;

				.material-icons {
					position: relative;
					color: $white;
					background: none;
					border: none;
					padding: 0;

					&.-active {
						color: $accent;
					}

					&.-single {
						&::after {
							content: "1";
							background-color: $accent;
							color: $white;
							border-radius: 20px;
							padding: 4px;
							position: absolute;
							top: -3px;
							right: -3px;
							font-size: 8px;
						}
					}
				}
			}

			&.-main {
				width: $mainWidth;
			}
		}
	}
</style>
