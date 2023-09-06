<template>
	<nav class="desktopPlayerBar">
		<div class="_part -side">
			<button class="material-icons" @click="player?.togglePlay()">
				{{ playIcon }}
			</button>
		</div>
		<div class="_part -main">
			<h2>
				{{ songName }}
			</h2>
			<PlayerProgressBar @progress="player?.seek($event)" />
			<div class="">
				<span>{{ startTime }}</span>
				<span>{{ artist }}</span>
				<span>{{ endTime }}</span>
			</div>
		</div>
		<div class="_part -side"></div>
	</nav>
</template>

<script setup lang="ts">
import PlayerProgressBar from "@/vue/components/PlayerBar/PlayerProgressBar.vue";
import { usePlayer } from "@/js/modules/player";
import { computed } from "vue";
import { useCurrentPlaylist } from "@/vue/stores/currentPlaylist.ts";

const playlist = useCurrentPlaylist();
const player = usePlayer();

const startTime = "0:00";
const endTime = computed(() => playlist.currentMusic?.duration ?? "--:--");
const songName = computed(() => playlist.currentMusic?.title ?? "");
const artist = computed(() => playlist.currentMusic?.artist ?? "");

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

		&:hover{
			background-color: $bgDark;
		}

		& > ._part {
			$sideWidth: 12.5%;
			$mainWidth: 100% - 2*$sideWidth;

			height: 100%;

			&.-side {
				width: $sideWidth;
			}

			&.-main {
				width: $mainWidth;
			}
		}
	}
</style>
