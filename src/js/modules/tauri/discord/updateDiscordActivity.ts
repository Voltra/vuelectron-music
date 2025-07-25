import {setActivity} from "tauri-plugin-drpc";
import {
	Activity,
	ActivityType,
	Assets,
} from "tauri-plugin-drpc/activity";
import {Music} from "@/js/modules/db";
import {biLogger} from "@/js/modules/tauri";

export const updateDiscordActivity = async (song: Music) => {

	const activity = new Activity()
		.setDetails(song.title)
		.setState(song.artist)
		.setAssets(new Assets().setLargeImage('icon').setLargeText(song.title))
		.setActivity(ActivityType.Listening);

	biLogger.debug(`[updateDiscordActivity] ${activity.toString()}`);

	await setActivity(activity);
};