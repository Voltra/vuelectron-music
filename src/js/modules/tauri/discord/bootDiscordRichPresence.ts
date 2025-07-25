import { start } from "tauri-plugin-drpc";
import {biLogger} from "@/js/modules/tauri";

export const bootDiscordRichPresence = async () => {
	biLogger.debug("before bootDiscordRichPresence");
	try {
		await start(import.meta.env.TAURI_DISCORD_APP_ID);
	} catch (e: unknown) {
		biLogger.error(`${e}`);
	}
	biLogger.debug("after bootDiscordRichPresence");
};