import { defineStore } from "pinia";
import { LoopMode, loopModeIcon, nextLoopMode } from "@/js/modules/player/loop";
import { AbstractLoopStrategy } from "@/js/modules/player/loop/strategy/AbstractLoopStrategy.ts";
import { getLoopStrategy } from "@/js/modules/player/loop/strategy";

export interface AppPreferences {
	loopMode: LoopMode;
	soundMuted: boolean;

	/**
	 * A [0;1] percentage of the player's volume bar
	 */
	volume: number;
}

export const usePreferences = defineStore("preferences", {
	persist: {
		debug: true,
	},
	state(): AppPreferences {
		return {
			loopMode: LoopMode.NONE,
			soundMuted: false,
			volume: 1,
		};
	},
	getters: {
		isLooping(): boolean {
			return this.loopMode !== LoopMode.NONE;
		},
		loopingSingle(): boolean {
			return this.loopMode === LoopMode.LOOP_SINGLE;
		},
		loopIcon(): string {
			return loopModeIcon(this.loopMode);
		},
		loopStrategy(): AbstractLoopStrategy {
			return getLoopStrategy(this.loopMode);
		},

		volumeIcon(): string {
			if (this.soundMuted) {
				return "volume_off";
			}

			if (this.volume > 0.5) {
				return "volume_up";
			}

			return this.volume > 0.25 ? "volume_down" : "volume_mute";
		},
	},
	actions: {
		nextMode() {
			this.loopMode = nextLoopMode(this.loopMode);
		},
		/**
		 * @param volume - A [0;1] number representing the percentage of the volume bar
		 */
		setVolume(volume: number) {
			this.volume = Math.min(1, Math.max(0, volume));
		},

		toggleMute() {
			this.soundMuted = !this.soundMuted;
		},
		unmute() {
			this.soundMuted = false;
		},
	},
});
