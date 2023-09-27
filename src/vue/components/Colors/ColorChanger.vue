<template>
	<ColorPicker
		v-model:color="state.color"
		:title="title"
		@ok="onOk"
		@cancel="onCancel"
		@reset="onReset"
	/>
</template>

<script setup lang="ts">
	import { computed, onBeforeUnmount, onMounted, reactive } from "vue";
	import { getCssVar, setCssVar } from "@/js/modules/cssVar";
	import { useSassMetaVariables } from "@/vue/stores/sassMetaVariables";
	import ColorPicker from "./ColorPicker.vue";
	import type { AppColor } from "@/js/modules/theme";
	import { palette } from "@/js/modules/theme/palette.ts";

	export interface ColorPickerProps {
		title: string;
		cssVar: AppColor;
	}

	const props = defineProps<ColorPickerProps>();

	const emit = defineEmits<{
		(eventName: "change", color: string): void;
	}>();

	const sassMeta = useSassMetaVariables();

	const state = reactive({
		color: "#fff",
		backupColor: "#fff",
	});

	const cssVarDark = computed<`${AppColor}-dark`>(() => `${props.cssVar}-dark`);

	const updateCssVar = (newColor: string) => {
		const darkened = sassMeta.darken(newColor);

		setCssVar(props.cssVar, newColor);
		setCssVar(cssVarDark.value, darkened);
	};

	const emitChange = (newColor: string) => {
		emit("change", newColor);
		updateCssVar(newColor);
	};

	const reset = (soft = true) => {
		state.color = soft ? (
			getCssVar(props.cssVar)
			|| "#ffffff"
		) : palette[props.cssVar]; //sassMeta[props.cssVar];

		state.backupColor = state.color;

		sassMeta.setColor(props.cssVar, state.color);
	};

	const onOk = () => {
		state.backupColor = state.color;
		sassMeta.setColor(props.cssVar, state.backupColor);
		emitChange(state.backupColor);
	};

	const onCancel = () => {
		state.color = state.backupColor;
		sassMeta.setColor(props.cssVar, state.color);
		emitChange(state.color);
	};

	const onReset = () => {
		reset(false);
		onOk();
	};

	onMounted(() => {
		reset(true);
	});

	onBeforeUnmount(() => {
		updateCssVar(state.backupColor);
	});
</script>

<style lang="scss">
	@use "@/scss/mixins" as *;
	@use "@/scss/variables" as *;

	.vc-photoshop {
		background: unset !important;

		&, & *:not(.vc-saturation-circle) {
			color: $white !important;
			font-family: r !important;
			box-shadow: unset !important;
			user-select: none !important;
		}

		filter: drop-shadow($regularDropShadowAlt);
		$radius: 10px;

		& .vc-ps {
			&-head {
				@include topRadius($radius);

				background-image: unset;
				background-color: $bgDark;
				color: $white;

				box-shadow: unset;
				border: none;
			}

			&-body {
				@include bottomRadius($radius);

				background-color: $bg;
				color: $white;

				& * {
					border: none;
				}

				& .vc-ps-controls {
					& .vc-ps-previews {
						&__label {
							color: $white;
						}
					}
				}

				& .vc-ps-actions {
					& .vc-ps-ac-btn {
						border: none;
						background-image: unset;
						color: $white;

						filter: drop-shadow($regularDropShadow);

						&:first-child {
							background-color: $accent;
						}

						//TODO: Check this (everyone from the 2nd)
						&:nth-child(n+2) {
							background-color: $default;
						}
					}

					& .vc-ps-fields {
						& .vc-editable-input {
							& .vc-input__input {
								background-color: $default;
								border: none;
								box-shadow: inset 0 0 1px 2px $white;

								user-select: all;
								text-align: center;

								padding-left: 0;
							}
						}
					}
				}
			}
		}
	}

</style>
