import {onBeforeUnmount, onMounted, ref} from "vue";
import {getCurrentWindow} from "@/js/modules/tauri";

export interface UseDragAndDropOptions {
	onHover: () => void;
	onDrop: (paths: string[]) => void;
	onCancel: () => void;
}

export const useDragAndDrop = ({
								   onHover = () => {
								   },
								   onDrop = () => {
								   },
								   onCancel = () => {
								   },
							   }: Partial<UseDragAndDropOptions> = {}) => {
	const unlisten = ref<null | (() => void)>(null);

	onMounted(async () => {
		unlisten.value = await getCurrentWindow().onDragDropEvent(event => {
			if (["enter", "over"].includes(event.payload.type)) {
				onHover();
			} else if ("drop" === event.payload.type) {
				onDrop(event.payload.paths);
			} else {
				onCancel();
			}
		});
	});

	onBeforeUnmount(() => {
		unlisten.value?.();
	});
};
