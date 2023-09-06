<template>
	<th v-if="type === TableCell.TH" v-bind="$attrs" :class="cellClasses" @click="onClick">
		<div :class="contentClasses" :title="text">
			{{ text }}

			<span v-if="!asIcon" class="material-icons">
				{{ sortIcon }}
			</span>
		</div>
	</th>

	<td v-if="type === TableCell.TD" v-bind="$attrs" :class="cellClasses" @click="onClick">
		<div :class="contentClasses" :title="text">
			{{ text }}
		</div>
	</td>
</template>

<script setup lang="ts">
	import { TableCell } from "@/types";
	import { Music } from "@/js/modules/db";
	import { computed } from "vue";

	export interface PlaylistItemCellProps {
		uniq: "play"|keyof Music;
		type?: TableCell;
		text?: string;
		observe?: boolean;
		asIcon?: boolean;
	}

	const props = withDefaults(defineProps<PlaylistItemCellProps>(), {
		type: TableCell.TD,
		text: "",
		observe: false,
		asIcon: false,
	});

	const emit = defineEmits<{
		(eventName: "click", props: Required<PlaylistItemCellProps>): void;
	}>();

	const cellClasses = ["_cell"];
	const contentClasses = computed(() => ({
		_content: true,
		"material-icons": props.asIcon,
	}));
	const sortIcon = "";

	const onClick = () => {
		if (props.observe) {
			emit("click", props);
		}
	};
</script>

<style lang="scss" scoped>
	@use "@/scss/variables" as *;
	@use "@/scss/mixins" as *;

	._cell {
		display: block;
		float: left;
		box-sizing: content-box;
		text-align: center;

		padding: $playlistCellPadding;
		@include flexDistribution;
		height: $playlistItemCellHeight;

		// &.play{
		padding-left: 0;
		// }

		& > ._content{
			line-height: $playlistItemCellHeight;
			vertical-align: middle;
			user-select: none;

			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;

			width: 100%;
			height: 100%;
		}
	}
</style>
