<template>
	<div class="topbar">
		<div class="_left">
			<TopBarButton :text="menuText" nobg noshadow left @click="toggleSettings"/>
		</div>

		<div class="_dragHandle" data-tauri-drag-region></div>

		<div class="_right">
			<TopBarButton :text="minimizeText" @click="minimizeCurrentWindow"/>
			<TopBarButton :text="maximizeText" @click="toggleMaximizeCurrentWindow"/>
			<TopBarButton :text="closeText" accent @click="closeCurrentWindow"/>
		</div>
	</div>

	<TransitionFade appear>
		<SettingsMenu v-if="state.openedSettings" @exit="hideSettings"/>
	</TransitionFade>
</template>

<script setup lang="ts">
	import TopBarButton from "./TopBarButton.vue";
	import { closeCurrentWindow, minimizeCurrentWindow, toggleMaximizeCurrentWindow } from "@/js/modules/tauri";
	import { reactive } from "vue";
	import SettingsMenu from "@/vue/components/Settings/SettingsMenu.vue";
	import { TransitionFade } from "@morev/vue-transitions";

	const closeText = "close";
	const maximizeText = "web_asset";
	const minimizeText = "remove";
	const menuText = "menu";

	const state = reactive({
		openedSettings: false,
	});

	const showSettings = () => {
		state.openedSettings = true;
	};

	const hideSettings = () => {
		state.openedSettings = false;
	};

	const toggleSettings = () => {
		if (state.openedSettings) {
			hideSettings();
		} else {
			showSettings();
		}
	};
</script>

<style lang="scss">
	@use "@/scss/variables" as *;

	.topbar {
		display: flex;
		justify-content: space-between;
		align-items: stretch;
		position: relative;
		z-index: $supraIndex;
		width: $topBarWidth;
		height: $topBarHeight;
		background-color: $bg;
		box-shadow: $regularShadow;

		& > ._dragHandle {
			-webkit-app-region: drag;
			width: $topBarDragHandleWidth;
			height: $topBarDragHandleHeight;
			//float: left;
			flex: 1 0 auto;
			cursor: grab;
		}

		& > ._left,
		& > ._right {
			position: relative;
			height: 100%;
		}

		/*& > ._left {
			float: left;
		}

		& > ._right {
			float: right;
		}*/
	}
</style>
