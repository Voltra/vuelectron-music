<template>
	<main class="dragdrop">
		<div
			:class="wrapperClasses"
			ref="dropZone"
			@click="onClick"
			@dragenter="toggleDragging"
			@dragleave="toggleDragging"
			@drop="onDrop"
		>
			<div class="_inner">
				<p class="_icon material-icons">
					{{ iconText }}
				</p>

				<h1 class="_text">
					{{ description }}
				</h1>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
	import { computed, onBeforeUnmount, onMounted, reactive, ref } from "vue";
	import { afterTransition } from "@/js/modules/transitions";
	import { pickFiles } from "@/js/modules/tauri/files";
	import type { FileLike } from "@/js/modules/dragAndDrop";
	import { cleanupAfterDrop, dragDropEvents } from "@/js/modules/dragAndDrop/events.ts";
	import { asSequence } from "sequency";
	import { useDragAndDrop } from "@/js/modules/dragAndDrop/useDragAndDrop.ts";
	import { parseMusic } from "@/js/modules/music/meta";
	import { db } from "@/js/modules/db";
	import { useCurrentPlaylist } from "@/vue/stores/currentPlaylist";

	definePage({
		name: "dragDrop",
	});

	const iconText = "file_download";
	const description = "Drag and drop your music files";

	const currentPlaylist = useCurrentPlaylist();
	const router = useRouter();

	const state = reactive({
		dragging: false,
		loading: false,
	});

	const wrapperClasses = computed(() => ({
		_wrapper: true,
		"-dragging": state.dragging,
		"-loading": state.loading,
	}));

	const dropZone = ref<HTMLElement | null>(null);

	const startDragging = () => {
		state.dragging = true;
	};

	const stopDragging = () => {
		state.dragging = false;
	};

	const startLoading = () => {
		state.loading = true;
	};

	const stopLoading = () => {
		state.loading = true;
	};

	const cleanupEvent = (e?: Event) => {
		if (!e) {
			return;
		}

		e.preventDefault();
		e.stopPropagation();
	};

	const toggleDragging = (e: Event) => {
		cleanupEvent(e);

		state.dragging = !state.dragging;
	};

	const addFiles = async (files: FileLike[]) => {
		startLoading();

		try {
			const promises = asSequence(files)
				.map(file => file.path)
				.map(parseMusic)
				.toArray();

			const songs = await Promise.all(promises);

			await db.musics.bulkPut(songs);

			currentPlaylist.setSongs(songs);

			return router.push({ name: "desktopPlayer" });
		} finally {
			stopLoading();
		}
	};

	const onClick = (e: MouseEvent) => {
		cleanupEvent(e);
		startDragging();

		afterTransition(async () => {
			try {
				const paths = await pickFiles({
					title: "Select music files",
					filters: [
						{
							name: "Music files",
							extensions: [
								"mp3",
								"flac",
								"wav",
								"aac",
								"ogg",
							],
						},
					],
				});

				const files = paths.map(path => ({ path }));

				await addFiles(files);
			} finally {
				stopDragging();
			}
		});
	};

	const onDrop = (e: Event) => {
		cleanupEvent(e);
		cleanupAfterDrop(e);
	};

	onMounted(() => {
		const dz = dropZone.value;
		dragDropEvents.forEach(ev => dz?.addEventListener(ev, cleanupEvent));
	});

	onBeforeUnmount(() => {
		const dz = dropZone.value;
		dragDropEvents.forEach(ev => dz?.removeEventListener(ev, cleanupEvent));
	});

	useDragAndDrop({
		onHover: startDragging,
		onDrop: paths => addFiles(paths.map(path => ({ path }))),
		onCancel: stopDragging,
	});
</script>

<style lang="scss" scoped>
	@use "@/scss/mixins" as *;
	@use "@/scss/variables" as *;

	.dragdrop {
		position: relative;
		width: $dragDropWidth;
		height: $dragDropHeight;

		padding: $dragDropWrapperSpacingV $dragDropWrapperSpacingH;
		-webkit-app-region: drag;
		background-color: $bg;

		* {
			-webkit-app-region: no-drag;
		}


		& > ._wrapper {
			position: relative;
			width: $dragDropWrapperWidth;
			height: $dragDropWrapperHeight;

			// @include margin-vertical($dragDropWrapperSpacingV);
			// @include margin-horizontal($dragDropWrapperSpacingH);

			cursor: pointer;
			background-color: $bg;
			color: $accent;

			border-color: currentColor;
			border-width: $dragDropBorderSize;
			border-style: dashed;
			border-radius: $dragDropBorderRadius;

			transition-property: background-color;
			transition-duration: $transitionDuration;
			transition-timing-function: ease-in-out;

			&.-dragging {
				background-color: $bgDark;

				& > ._inner {
					$space: 3rem;

					& > ._icon {
						margin-bottom: $space;
					}

					& > ._text {
						margin-top: $space;
					}
				}
			}

			&.-loading {
				cursor: wait;

				& > * {
					opacity: 0.5;
					scale: 0.9;
				}
			}

			& > ._inner {
				position: relative;
				width: $dragDropInnerWidth;
				max-height: $dragDropInnerHeight;

				//@include margin-vertical($dragDropInnerSpacingV);
				//@include margin-horizontal($dragDropInnerSpacingH);

				@include lr($dragDropInnerSpacingH);
				top: 50%;
				transform: translateY(-50%);

				& > ._icon, & > ._text {
					user-select: none;
					text-align: center;
					display: block;
					transition: all $transitionDuration ease-in-out;
				}

				& > ._icon {
					font-size: $dragDropIconFontSize;
					// height: $dragDropIconHeight;
					// @include padding-vertical($dragDropIconSpacingV);
				}

				& > ._text {
					font-size: $dragDropFontSize;
					// height: $dragDropTextHeight;
					// @include padding-vertical($dragDropTextSpacingV);
				}
			}
		}
	}
</style>
