import {setupSplashscreen} from "@/js/modules/tauri/splashscreen";
import {bootDiscordRichPresence} from "@/js/modules/tauri/discord";

export const boot = () => setupSplashscreen(async () => {
	await bootDiscordRichPresence();
});