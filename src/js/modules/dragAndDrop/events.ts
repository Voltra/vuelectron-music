export const dragDropEvents = ["drag", "dragstart", "dragend", "dragover", "dragenter", "dragleave", "drop"];

export const cleanupAfterDrop = (e: Event) => {
	if (!(e instanceof DragEvent)) {
		return;
	}

	e.dataTransfer?.items?.clear();
	e.dataTransfer?.clearData();
};
