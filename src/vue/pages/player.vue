<template>
	<audio
		ref="audio"
		controls
	/>

	<RouterView/>
</template>

<script setup lang="ts">
	import { definePlayer } from "@/js/modules/player";

	const audio = ref<HTMLAudioElement>();

	definePlayer(audio);
</script>

<style lang="scss" scoped>
	audio {
		position: absolute;
		z-index: -1;
		visibility: hidden;
		height: 0;
		opacity: 0;
		pointer-events: none;
	}
</style>
