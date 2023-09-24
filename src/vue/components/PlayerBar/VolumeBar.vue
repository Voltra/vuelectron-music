<template>
	<div class="playerVolumeBar" ref="wrapper" @mouseleave="endDrag" @mouseup="onMouseUp">
		<div class="_rail" ref="rail" @click="onMouseEvent">
			<div class="_progress" ref="progress" :style="styles" @mousedown="onMouseDown" @mouseup="onMouseUp">
				<div class="_thumb" ref="thumb" @mousedown="onMouseDown" @mouseup="onMouseUp"></div>
			</div>


			<div class="_tooltip" ref="tooltip" :style="tooltipStyles">
			<span>
				{{ tooltipText }}
			</span>
				<span class="_tooltipArrow" ref="tooltipArrow"></span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useCurrentPlaylistController } from "@/js/modules/player";
	import { computed, reactive, ref } from "vue";
	import { useMouseInElement } from "@vueuse/core";
	import { usePreferences } from "@/vue/stores/preferences";

	const preferences = usePreferences();
	const playlistController = useCurrentPlaylistController();

	const wrapper = ref<HTMLElement>();
	const rail = ref<HTMLElement>();
	const progress = ref<HTMLElement>();
	const thumb = ref<HTMLElement>();
	const tooltip = ref<HTMLElement>();
	const tooltipArrow = ref<HTMLElement>();

	const refs = reactive({
		wrapper,
		rail,
		progress,
		thumb,
		tooltip,
		tooltipArrow,
	});

	const state = reactive({
		dragEnterDepth: 0,
	});

	const tooltipState = reactive(useMouseInElement(wrapper, { handleOutside: true }));


	const styles = computed(() => `top: ${100 * (1 - preferences.volume)}%; height: ${100 * preferences.volume}%;`);

	const tooltipPercent = computed(() => {
		const percentage = Math.min(1, Math.max(0, 1 - (tooltipState.elementY / tooltipState.elementHeight)));

		return isFinite(percentage) ? percentage : 0;
	});
	const tooltipStyles = computed(() => `bottom: ${100 * tooltipPercent.value}%;`);
	const tooltipText = computed(() => `${(100 * tooltipPercent.value).toFixed(0)}%`);

	const computePercentage = (e: MouseEvent, el: HTMLElement) => {
		const elemRect = el.getBoundingClientRect();
		const { top, height } = elemRect;
		const { y } = e;

		const tmp = 100 - (Math.abs(y - top) / height * 100);
		return Math.min(100, Math.max(0, tmp));
	};

	const updatePercentage = (percentage: number) => {
		percentage = isFinite(percentage) ? percentage : 0;
		playlistController.setVolume(percentage / 100);
	};

	const onMouseEvent = (e: MouseEvent) => {
		const percentage = computePercentage(e, refs.rail!);
		updatePercentage(percentage);
	};

	const startDrag = () => {
		refs.wrapper!.addEventListener("mousemove", onMouseEvent);
		refs.rail!.classList.add("-active");
	};

	const endDrag = () => {
		refs.rail!.classList.remove("-active");
		refs.wrapper!.removeEventListener("mousemove", onMouseEvent);
	};

	const onMouseDown = (e: MouseEvent) => {
		onMouseEvent(e);

		if (state.dragEnterDepth === 0) {
			state.dragEnterDepth += 1;
			startDrag();
		}
	};

	const onMouseUp = (e: MouseEvent) => {
		state.dragEnterDepth -= 1;
		state.dragEnterDepth = Math.max(state.dragEnterDepth, 0);

		if (state.dragEnterDepth === 0) {
			endDrag();
		}

		onMouseEvent(e);
	};
</script>

<style lang="scss" scoped>
	@use "@/scss/variables" as *;
	@use "@/scss/mixins" as *;

	.playerVolumeBar {
		$spacing: rem(10px);

		height: rem(150px);
		background: $bgDark;
		filter: $dropShadow;

		&::before,
		&::after {
			position: absolute;
			display: block;
			width: 100%;
			content: "";
			height: $spacing;
			background: inherit;
		}

		&::before {
			top: 0;
			transform: translateY(-100%);
		}

		&::after {
			bottom: 0;
			transform: translateY(100%);
		}

		&:hover {
			._tooltip {
				opacity: 1;
			}
		}

		&,
		._rail,
		._progress {
			position: relative;
		}


		._rail,
		._progress {
			width: $playerProgressBarRailHeight;
		}

		._progress,
		._thumb {
			background-color: $accent;

			&:hover, &.-active {
				background-color: $accentDark;
			}
		}

		._rail {
			left: $playerProgressBarRailMarginTop;
			cursor: pointer;
			height: 100%;
			background-color: $secondary;
			box-shadow: $heavyRegularShadow;
		}

		._progress {
			height: 100%;
			bottom: 0;
		}

		._thumb {
			//$offset: 25%;
			$size: 17px;

			position: absolute;
			//right: 0;
			left: 50%;
			top: -$size * 0.5;
			transform: translateX(-50%);
			//width: calc(#{$playerProgressBarRailHeight} * (2 * #{stripUnit($offset)} / 100 + 1));
			width: $size;
			height: $size;
			border-radius: $fullWidth;
			z-index: 2;

			transition: transform 0.2s ease-in-out;
			cursor: grab;

			&:hover, &.active {
				transform: translateX(-50%) scale(1.1);
			}

			&.active {
				cursor: grabbing;
			}
		}

		._tooltip {
			$color: $accent;

			position: absolute;
			z-index: 3;
			font-size: rem(10px);
			font-family: r;
			width: max-content;
			background: $color;
			padding: rem(10px);
			transform: translateX(calc(-100% - 16px)) translateY(50%);
			border-radius: rem(4px);
			opacity: 0;
			pointer-events: none;
			transition: opacity $transitionDuration ease-in-out;

			& > ._tooltipArrow {
				$size: 8px;
				position: absolute;
				bottom: 0;
				right: 0;
				border: $size solid transparent;
				border-left-color: $color;
				width: $size;
				height: $size;
				transform: translateY(-50%) translateX(96%);
			}
		}
	}
</style>

