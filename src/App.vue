<template>
	<div class="app">
		<TopBar/>

		<RouterView/>
	</div>
</template>

<script lang="ts" setup>
import TopBar from "./vue/components/TopBar/TopBar.vue";
import {onMounted} from "vue";
import {removeSpinnerLord} from "./js/modules/spinnerLord";
import {useSassMetaVariables} from "@/vue/stores/sassMetaVariables.ts";
import {setup} from "@/js/modules/tauri";

onMounted(async () => {
	useSassMetaVariables(); // Refresh

	await setup();

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
