<template>
	<nav class="desktopPlayerBar">
		<div class="_part -side -left">
			<button class="material-icons" @click="playlistController.playSequentiallyPrev">
				navigate_before
			</button>

			<button class="material-icons -play" @click="playlistController.togglePlay">
				{{ playIcon }}
			</button>

			<button class="material-icons" @click="playlistController.playSequentiallyNext">
				navigate_next
			</button>
		</div>

		<div class="_part -main">
			<h2 class="_title">
				{{ songName }}
			</h2>

			<PlayerProgressBar
				:class="progressClasses"
				:active="isActive"
				:duration="duration"
				@progress="player?.seek($event)"
			/>

			<div class="_time">
				<span class="_timeCode">{{ startTime }}</span>
				<span>{{ artist }}</span>
				<span class="_timeCode">{{ endTime }}</span>
			</div>
		</div>

		<div class="_part -side -right">
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
				Math.round(playlist.currentMusic!.durationSeconds * (progressNum.value ?? 0)),
			);
		} else {
			return "0:00";
		}
	});
	const duration = computed(() => playlist.currentMusic?.durationSeconds ?? 0);
	const endTime = computed(() => playlist.currentMusic?.duration ?? "--:--");
	const songName = computed(() => playlist.currentMusic?.title ?? "");
	const artist = computed(() => playlist.currentMusic?.artist ?? "");
	const isActive = computed(() => !!playlist.currentMusic);

	const loopClasses = computed(() => ({
		"material-icons": true,
		"-active": preferences.isLooping,
		"-single": preferences.loopingSingle,
	}));
	const progressClasses = computed(() => ({
		_progress: true,
		"-disabled": !isActive.value,
	}));

	const playIcon = computed(() => player.value?.isPlaying.value ? "pause" : "play_arrow");
</script>

<style lang="scss" scoped>
	@use "@/scss/variables" as *;
	@use "@/scss/mixins" as *;

	.desktopPlayerBar {
		$spacing: 14px;

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
			$sideWidth: 10%;
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
							@include flexCentered;
							content: "1";
							background-color: $accent;
							color: $white;
							border-radius: 20px;
							padding: 4px 6.66px;
							position: absolute;
							letter-spacing: -0.5px;
							top: 0;
							right: 0;
							font-size: rem(12px);
							font-family: r;
							transform: translate3d(25%, -25%, 0);
						}
					}
				}

				& > * {
					@include horizontalMargin(rem(6px));

					font-size: rem(32px);

					&.-play {
						font-size: rem(36px);
					}
				}
			}

			&.-main {
				@include flexCentered;

				align-items: stretch;
				flex-flow: column;

				position: relative;
				width: $mainWidth;

				&:hover {
					:deep(._tooltip) {
						opacity: 1;
					}

					._progress.-disabled :deep(._tooltip) {
						opacity: 0;
					}
				}
			}
		}

		._title,
		._time {
			position: absolute;
			width: 100%;
		}

		._title {
			@include flexCentered;

			font-size: rem(20px);
			transform: translateY(-100%);
			margin-bottom: $spacing;
		}

		._time {
			@include flexSpread;
			transform: translateY(100%);
			margin-top: $spacing;
		}

		._timeCode {
			font-size: rem(14px);
		}
	}
</style>
