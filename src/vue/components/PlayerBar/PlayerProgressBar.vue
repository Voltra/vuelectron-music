<template>
	<div class="playerProgressBar" ref="wrapper" @mouseleave="endDrag">
		<div class="_rail" ref="rail" @click="onMouseEvent">
			<div class="_progress" ref="progress" :style="styles" @mousedown="onMouseDown" @mouseup="onMouseUp">
				<div class="_thumb" ref="thumb" @mousedown="onMouseDown" @mouseup="onMouseUp"></div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed, reactive, ref } from "vue";
	import { usePlayer } from "@/js/modules/player";
	import { watchExtractedObservable } from "@/vue/composables/rx.ts";

	const wrapper = ref<HTMLElement>();
	const rail = ref<HTMLElement>();
	const progress = ref<HTMLElement>();
	const thumb = ref<HTMLElement>();

	const refs = reactive({
		wrapper,
		rail,
		progress,
		thumb,
	});

	const emit = defineEmits<{
		(eventName: "progress", percentage: number): void;
	}>();

	const player = usePlayer();
	watchExtractedObservable(player, _ => _.progress$, snapshot => {
		state.percentage = snapshot * 100;
	});

	const state = reactive({
		percentage: 0,
	});

	const styles = computed(() => `width: ${state.percentage}%;`);

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
		height: 100%;

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

			&:hover, &.-active{
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
			$offset: 25%;

			position: absolute;
			right: 0;
			@include tb(-1 * $offset);
			transform: translateX(50%);
			width: calc(#{$playerProgressBarRailHeight} * (2 * #{stripUnit($offset)} / 100 + 1));
			border-radius: $fullWidth;

			transition: transform 0.2s ease-in-out;
			cursor: grab;

			&:hover, &.active{
				transform: translateX(50%) scale(1.1);
			}

			&.active{
				cursor: grabbing;
			}
		}

		:not(&__rail){
			box-shadow: $rightShadow;
		}
	}
</style>
