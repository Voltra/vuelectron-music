import { open } from "@tauri-apps/api/dialog";

export const pickDir = async (): Promise<string|null> => {
	const selected = await open({
		directory: true,
	});

	return Array.isArray(selected) ? selected[0] : selected;
};
