<template>
	<div :class="classes" @click="$emit('click', $event)">
		<div class="_text material-icons">
			{{ text }}
		</div>
	</div>
</template>

<script setup lang="ts">
	import {computed} from "vue";

	export interface TopBarButtonProps {
		text: string;
		accent?: boolean;
		nobg?: boolean;
		left?: boolean;
		noshadow?: boolean;
		action?: () => void;
	}

	const props = withDefaults(defineProps<TopBarButtonProps>(), {
		accent: false,
		nobg: false,
		left: false,
		noshadow: false,
		action: () => {
		},
	});

	defineEmits<{
		(eventName: "click", e: MouseEvent): void;
	}>();

	const classes = computed(() => ({
		_button: true,
		"-accent": props.accent,
		"-noBg": props.nobg,
		"-left": props.left,
		"-noShadow": props.noshadow,
	}));
</script>

<style lang="scss">
	@use "../../../scss/variables" as *;

	._button {
		width: $topBarButtonWidth;
		height: $topBarButtonHeight;

		float: left;
		cursor: pointer;
		background-color: $default;
		color: $white;

		box-shadow: $leftShadow;

		transition: all 0.3s ease-in-out;

		&:hover {
			background-color: $defaultDark;
			box-shadow: $heavyLeftShadow;
		}

		&.-accent {
			background-color: $accent;

			&:hover {
				background-color: $accentDark;
			}
		}

		&.-noBg {
			background-color: transparent;

			&:hover {
				background-color: $bgDark;
			}
		}

		&.-left {
			box-shadow: $rightShadow;

			&:hover {
				box-shadow: $heavyRightShadow;
			}
		}

		&.-noShadow {
			&, &:hover {
				box-shadow: none;
			}
		}

		& > ._text {
			user-select: none;
			font-size: $topBarButtonFontSize;
			margin: $topBarButtonMarginV $topBarButtonMarginH;
		}
	}
</style>
