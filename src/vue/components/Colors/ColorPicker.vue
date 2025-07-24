<template>
	<Photoshop
		:has-reset-button="!hideResetButton"
		:head="title"
		:modelValue="colorObj"
		@cancel="$emit('cancel')"
		@ok="$emit('ok')"
		@reset="$emit('reset')"
		@update:modelValue="$emit('update:color', $event.hex)"
	/>
</template>

<script lang="ts" setup>
import {Photoshop} from "@ckpack/vue-color";
import {computed} from "vue";
import {TinyColor} from "@ctrl/tinycolor";

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
