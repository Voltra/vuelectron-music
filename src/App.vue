<template>
	<div class="app">
		<TopBar/>

		<RouterView />
	</div>
</template>

<script setup lang="ts">
	import TopBar from "./vue/components/TopBar/TopBar.vue";
	import { onMounted } from "vue";
	import { removeSpinnerLord } from "./js/modules/spinnerLord";

	onMounted(() => {
		removeSpinnerLord();
	});
</script>

<style lang="scss">
	@use "@/scss/variables" as *;

	.app {
		width: $fullWidth;
		height: $fullHeight;
		overflow: hidden;
		-webkit-app-region: drag;

		& > * {
			-webkit-app-region: no-drag;
		}
	}
</style>
