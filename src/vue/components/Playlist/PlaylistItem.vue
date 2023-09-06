<template>
	<tr :class="classes">
		<PlaylistItemCell
			v-for="cell of musicCells"
			:key="cell.property"
			:class="cell.classes"
			:uniq="cell.property"
			:text="cell.text"
			:type="TableCell.TD"
			:as-icon="cell.property === 'play'"
			:observe="!!cell.listener"
			@click="cell.listener"
		/>
	</tr>
</template>

<script setup lang="ts">
	import { Music } from "@/js/modules/db";
	import { computed } from "vue";
	import { asSequence } from "sequency";
	import PlaylistItemCell from "@/vue/components/Playlist/PlaylistItemCell.vue";
	import { TableCell } from "@/types.ts";
	import { match } from "ts-pattern";

	export interface PlaylistItemProps {
		music: Music;

		headers: Array<{
			name: "play"|keyof Music;
			text: string;
			classes: string[];
		}>;

		active: boolean;

		/**
		 * Whether there's a music currently being played (vs paused)
		 */
		playing: boolean;
	}


	interface Cell extends Music {
		play: any;
	}

	interface CellEntry {
		property: keyof Cell;
		text: string;
		classes: string[];
		listener?: () => void;
	}

	const props = defineProps<PlaylistItemProps>();

	const emit = defineEmits<{
		(eventName: "toggleActive"): void;
	}>();

	const classes = computed(() => ({
		_item: true,
		"-active": props.active,
	}));

	const getHeaderIndex = (prop: keyof Cell) => props.headers.findIndex(({ name }) => name === prop);

	const decorateMusicCell = (entry: CellEntry) => {
		if (entry.property === "play") {
			entry.classes.push("material-icons");
			entry.text = match([props.active, props.playing] as const)
				.with([true, true], () => "pause")
				.with([true, false], () => "play_circle_filled")
				.otherwise(() => "play_arrow");
			entry.listener = () => emit("toggleActive");
		}

		return entry;
	};

	const musicCells = computed(() => {
		return asSequence<PlaylistItemProps["headers"][number]>(props.headers)
			.map(header => header.name)
			.map(key => [key, props.music[key] ?? ""] as const)
			.map(([property, text]) => ({ property, text } as const))
			.sortedBy(getHeaderIndex)
			.mapIndexed((i, val) => ({
				...val,
				classes: props.headers[i].classes.concat("item")
			}))
			.map(decorateMusicCell)
			.toArray();
	});
</script>

<style lang="scss" scoped>
	@use "@/scss/variables" as *;
	@use "@/scss/mixins" as *;

	._item{
		@include playlistSharedTrStyles;

		@include mmwidth(100%);
		// @include mmwidth($playlistItemWidth);
		@include mmheight($playlistItemHeight);
	}
</style>
