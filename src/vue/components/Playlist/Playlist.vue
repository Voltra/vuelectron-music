<template>
	<section class="playlist" ref="container" v-scrollbar-x>
		<table class="_table">
			<thead class="_head">
				<tr>
					<PlaylistItemCell
						v-for="header in headers"
						:key="header.name"
						:class="header.classes"
						:uniq="header.name"
						:type="TableCell.TH"
						:text="header.text"
						:observe="header.shouldListenToEvents"
						@click="changeSortCol"
					/>
				</tr>
			</thead>

			<tbody class="_body" ref="body" v-scrollbar-y>
				<PlaylistItem
					v-for="music in songs"
					:playing="playing"
					:key="music.id"
					:music="music"
					:headers="headers"
					:active="music.id === activeId"
					@toggleActive="$emit('toggleMusic', music)"
				/>
			</tbody>
		</table>
	</section>
</template>

<script setup lang="ts">
	import { ScrollableHtmlElement, vScrollbarX, vScrollbarY } from "@/vue/directives/scrollbars";
	import { Music } from "@/js/modules/db";
	import { onMounted, reactive, ref, watch } from "vue";
	import { Nullable, TableCell } from "@/types";
	import PlaylistItemCell from "@/vue/components/Playlist/PlaylistItemCell.vue";
	import PlaylistItem from "@/vue/components/Playlist/PlaylistItem.vue";

	const container = ref<ScrollableHtmlElement>();
	const body = ref<ScrollableHtmlElement>();

	const refs = reactive({
		container,
		body,
	});

	export interface PlaylistProps {
		activeId: Nullable<string>;
		playing: boolean;
		songs: Music[];
	}

	defineProps<PlaylistProps>();

	const emit = defineEmits<{
		(eventName: "toggleMusic", music: Music): void;
		(eventName: "sort", sortFn: (lhs: Music, rhs: Music) => number): void;
	}>();

	const state = reactive({
		sortingFunction: (lhs: Music, rhs: Music) => lhs.title.localeCompare(rhs.title),
		sortingCriteria: "title" as keyof Music,
		isSortAscending: true,
	});

	const headerClasses = [] as string[];

	const headers = ([
		{ name: "play", text: "", classes: headerClasses },
		{ name: "title", text: "title", classes: headerClasses },
		{ name: "duration", text: "duration", classes: headerClasses },
		{ name: "artist", text: "artist", classes: headerClasses },
		{ name: "album", text: "album", classes: headerClasses },
//						{name: "year", text: "year", classes: headerClasses},
		{ name: "genre", text: "genre", classes: headerClasses },
		/*{name: "date_added", text: "date added", classes: headerClasses},
		{name: "plays", text: "# of plays", classes: headerClasses},*/
	] as const).map(obj => ({
		...obj,
		classes: obj.classes.concat(obj.name),
		shouldListenToEvents: obj.name !== "play",
	}));

	const sortingFunctionFactory = (criteria: keyof Music, asc = true) => {
		return asc
			? (lhs: Music, rhs: Music) => lhs[criteria].toString().localeCompare(rhs[criteria].toString())
			: (lhs: Music, rhs: Music) => rhs[criteria].toString().localeCompare(lhs[criteria].toString());
	};

	const updateScrollbars = () => {
		refs.body!.$scrollbar?.update();
		refs.container!.$scrollbar?.update();
	};

	const changeSortCol = ({ uniq }: { uniq: "play"|keyof Music }) => {
		if (uniq === "play") {
			return;
		}

		if (state.sortingCriteria === uniq) {
			state.isSortAscending = !state.isSortAscending;
		} else {
			state.isSortAscending = true;
			state.sortingCriteria = uniq;
		}

		state.sortingFunction = sortingFunctionFactory(uniq, state.isSortAscending);
	};

	watch(() => state.sortingFunction, () => {
		emit("sort", state.sortingFunction);
	}, {
		immediate: true,
	});

	onMounted(() => {
		updateScrollbars();
	});
</script>

<style lang="scss" scoped>
	@use "@/scss/variables" as *;
	@use "@/scss/mixins" as *;

	.playlist {
		//position: relative;
		display: block;

		width: $fullWidth; //$playlistWidth;
		height: $playlistHeight;

		& > ._table {
			position: relative;
			display: block;

			min-width: 100%;
			width: $playlistTableWidth;
			height: $playlistTableHeight;

			& > ._head,
			& > ._body {
				position: relative;
				display: block;
			}

			& ._head {
				width: $playlistHeadWidth;
				height: $playlistHeadHeight;

				tr {
					@include playlistSharedTrStyles;

					background-color: $bg;

					&:hover {
						background-color: $bgDark;
					}
				}
			}

			& > ._body {
				width: $playlistBodyWidth;
				height: $playlistBodyHeight;

				tr {
					background-color: $default;

					&:hover {
						background-color: $defaultDark;
					}

					&:nth-child(even) {
						background-color: $secondary;

						&:hover {
							background-color: $secondaryDark;
						}
					}

					&.-active {
						background-color: $accent;

						&:hover {
							background-color: $accentDark;
						}
					}
				}
			}

			tr {
				transition: background-color $transitionDuration ease-in-out;

				&::before {
					box-shadow: $bottomShadow;
				}
			}
		}
	}
</style>
