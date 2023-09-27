<template>
	<Photoshop
		:head="title"
		:modelValue="colorObj"
		:has-reset-button="!hideResetButton"
		@ok="$emit('ok')"
		@cancel="$emit('cancel')"
		@update:modelValue="$emit('update:color', $event.hex)"
		@reset="$emit('reset')"
	/>
</template>

<script setup lang="ts">
	import { Photoshop } from "@ckpack/vue-color";
	import { computed } from "vue";
	import { TinyColor } from "@ctrl/tinycolor";

	export interface ColorPickerProps {
		title: string;
		color: string;
		hideResetButton?: boolean;
	}

	const props = withDefaults(defineProps<ColorPickerProps>(), {
		hideResetButton: false,
	});

	const colorObj = computed(() => new TinyColor(props.color));

	defineEmits<{
		(eventName: "ok"): void;
		(eventName: "cancel"): void;
		(eventName: "update:color", color: string): void;
		(eventName: "reset"): void;
	}>();
</script>
