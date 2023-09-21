import { DurationString } from "@/js/modules/music/meta/types.ts";

const pad = (num: number, maxLen = 2) => num.toString().padStart(maxLen, "0");

export const formatMusicDuration = (durationInSeconds: number): DurationString => {
	if (!isFinite(durationInSeconds)) {
		return "--:--";
	}

	/*const hours = Math.floor(duration / 3600);
				const mod3600 = duration % 3600;
				const minutes = Math.floor(mod3600 / 60);
				const mod60 = mod3600 % 60;
				const seconds = Math.ceil(mod60 / 60);*/

	const hours = Math.floor(durationInSeconds / 3600);
	const minutes = Math.floor((durationInSeconds - hours*3600) / 60);
	const seconds = Math.floor(durationInSeconds - minutes*60 - hours*3600);

	const secondsStr = pad(seconds);

	return hours ? `${pad(hours)}:${pad(minutes)}:${secondsStr}` : `${minutes}:${secondsStr}`;

	/*
	https://stackoverflow.com/questions/8193868/convert-seconds-to-human-readable-time-duration

	const hours = Math.floor(duration / 3600);
	const minutes = Math.floor((duration - hours*3600) / 60);
	const seconds = duration - minutes*60 - hours*3600;
	*/
};
