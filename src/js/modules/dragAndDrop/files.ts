export const getFilesFromDropEvent = (e: Event): File[] => {
	if (!(e instanceof DragEvent)) {
		return [];
	}

	return Array.from(e.dataTransfer?.files ?? []);
}

export interface FileLike {
	path: string;
}
