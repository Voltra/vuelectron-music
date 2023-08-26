import { open, OpenDialogOptions } from "@tauri-apps/api/dialog";
import { asMultiplePicks } from "@/js/modules/tauri/files/pickResult";

export const pickFiles = async (options: Partial<OpenDialogOptions> = {}) => {
	const pickResult = await open({
		...options,
		multiple: true,
	});

	return asMultiplePicks(pickResult);
};
