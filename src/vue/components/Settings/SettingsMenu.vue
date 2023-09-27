<template>
	<div class="settings">
		<div class="_wrapper" v-scrollbar-y>
			<ColorChanger v-for="color in colors" :key="color.cssVar" v-bind="color" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import ColorChanger from "@/vue/components/Colors/ColorChanger.vue";
	import { vScrollbarY } from "@/vue/directives/scrollbars.ts";

	const colors = [
		{title: "Change your accent color", cssVar: "accent"},
		{title: "Change your background color", cssVar: "bg"},
		{title: "Change your default color", cssVar: "default"},
		{title: "Change your text color", cssVar: "white"},
		{title: "Change your secondary color", cssVar: "secondary"},
	] as const;

	defineEmits<{
		(eventName: "exit"): void;
	}>();
</script>

<style lang="scss" scoped>
	@use "@/scss/mixins" as *;
	@use "@/scss/variables" as *;

	.settings{
		width: $settingsMenuWidth;
		height: $settingsMenuHeight;
		background-color: $bg;
		-webkit-app-region: no-drag;

		overflow: hidden;

		& > ._wrapper{
			$gap: 1rem;

			@include mmheight(100%);

			width: 100%;
			padding: $gap;
			display: flex;
			flex-flow: row wrap;
			justify-content: center;
			align-items: center;
			gap: $gap;
			grid-template-columns: repeat(auto-fit, 514px);
		}
	}
</style>
