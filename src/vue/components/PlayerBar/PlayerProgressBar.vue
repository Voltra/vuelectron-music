<template>
	<div :class="classes" ref="wrapper" @mouseleave="endDrag" @mouseup="onMouseUp">
		<div class="_rail" ref="rail" @click="onMouseEvent">
			<div class="_progress" ref="progress" :style="styles" @mousedown="onMouseDown" @mouseup="onMouseUp">
				<div class="_thumb" ref="thumb" @mousedown="onMouseDown" @mouseup="onMouseUp"></div>
			</div>
		</div>
		<div class="_tooltip" ref="tooltip" :style="tooltipStyles">
					<span>
						{{ tooltipText }}
					</span>
			<span class="_tooltipArrow" ref="tooltipArrow"></span>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed, reactive, ref } from "vue";
	import { usePlayer } from "@/js/modules/player";
	import { watchExtractedObservable } from "@/vue/composables/rx.ts";
	import { useMouseInElement } from "@vueuse/core";
	import { formatMusicDuration } from "@/js/modules/music/meta";

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

	const props = defineProps<{
		active: boolean,
		duration: number,
	}>();

	const emit = defineEmits<{
		(eventName: "progress", percentage: number): void;
	}>();

	const player = usePlayer();
	watchExtractedObservable(player, _ => _.progress$, snapshot => {
		state.percentage = snapshot * 100;
	});

	const tooltipState = reactive(useMouseInElement(wrapper, { handleOutside: true }));

	const state = reactive({
		percentage: 0,
	});

	const classes = computed(() => ({
		playerProgressBar: true,
		"-inactive": !props.active,
	}));
	const styles = computed(() => `width: ${state.percentage}%;`);

	const tooltipPercent = computed(() => {
		const percentage = Math.min(1, Math.max(0, tooltipState.elementX / tooltipState.elementWidth));

		return isFinite(percentage) ? percentage : 0;
	});
	const tooltipStyles = computed(() => `left: ${100 * tooltipPercent.value}%;`);
	const tooltipText = computed(() => formatMusicDuration(props.duration * tooltipPercent.value));

	const computePercentage = (e: MouseEvent, el: HTMLElement) => {
		const elemRect = el.getBoundingClientRect();
		const { left, width } = elemRect;
		const { x } = e;

		// console.log(`x: ${x}, width: ${width}, left: ${left}`);

		const tmp = (x - left) / width * 100;
		return Math.min(100, Math.max(0, tmp));
	};

	const updatePercentage = (percentage: number) => {
		state.percentage = percentage;
		emit("progress", percentage / 100);
	};

	const onMouseEvent = (e: MouseEvent) => {
		if (!props.active) {
			return;
		}

		const percentage = computePercentage(e, refs.rail!);
		updatePercentage(percentage);
	};

	const startDrag = () => {
		if (!props.active) {
			return;
		}

		refs.wrapper!.addEventListener("mousemove", onMouseEvent);
		refs.rail!.classList.add("-active");
	};

	const endDrag = () => {
		if (!props.active) {
			return;
		}

		refs.rail!.classList.remove("-active");
		refs.wrapper!.removeEventListener("mousemove", onMouseEvent);
	};

	const onMouseDown = (e: MouseEvent) => {
		onMouseEvent(e);
		startDrag();
	};
	const onMouseUp = (e: MouseEvent) => {
		endDrag();
		onMouseEvent(e);
	};
</script>

<style lang="scss" scoped>
	@use "@/scss/variables" as *;
	@use "@/scss/mixins" as *;

	.playerProgressBar {
		//height: 100%;

		&.-inactive {
			pointer-events: none;
		}

		&:hover {
			._tooltip {
				opacity: 1;
				pointer-events: auto;
			}
		}

		&,
		._rail,
		._progress {
			position: relative;
		}


		._rail,
		._progress {
			height: $playerProgressBarRailHeight;
		}

		._progress,
		._thumb {
			background-color: $accent;

			&:hover, &.-active {
				background-color: $accentDark;
			}
		}

		._rail {
			top: $playerProgressBarRailMarginTop;
			cursor: pointer;
			width: 100%;
			background-color: $secondary;
			box-shadow: $heavyRegularShadow;
		}

		._progress {
			width: 100%;
		}

		._thumb {
			//$offset: 25%;
			$size: 17px;

			position: absolute;
			//right: 0;
			top: 50%;
			left: calc(100% - #{$size * 0.5});
			transform: translateY(-50%);
			//width: calc(#{$playerProgressBarRailHeight} * (2 * #{stripUnit($offset)} / 100 + 1));
			width: $size;
			height: $size;
			border-radius: $fullWidth;
			z-index: 2;

			transition: transform 0.2s ease-in-out;
			cursor: grab;

			&:hover, &.active {
				transform: translateY(-50%) scale(1.1);
			}

			&.active {
				cursor: grabbing;
			}
		}

		._tooltip {
			$color: $accent;

			position: absolute;
			top: 0;
			z-index: 3;
			width: max-content;
			background: $color;
			padding: rem(10px);
			transform: translateY(calc(-100% - 16px)) translateX(-50%);
			border-radius: rem(4px);
			opacity: 0;
			pointer-events: none;
			transition: opacity $transitionDuration ease-in-out;

			& > ._tooltipArrow {
				$size: 8px;
				position: absolute;
				bottom: 0;
				left: 50%;
				border: $size solid transparent;
				border-top-color: $color;
				width: $size;
				height: $size;
				transform: translateY(100%) translateX(-50%);
			}
		}

		//:not(&__rail) {
		//	box-shadow: $rightShadow;
		//}
	}
</style>
