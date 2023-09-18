import { defineStore } from "pinia";
import { LoopMode, loopModeIcon, nextLoopMode } from "@/js/modules/player/loop";
import { AbstractLoopStrategy } from "@/js/modules/player/loop/strategy/AbstractLoopStrategy.ts";
import { getLoopStrategy } from "@/js/modules/player/loop/strategy";

export interface AppPreferences {
	loopMode: LoopMode;
}

export const usePreferences = defineStore("preferences", {
	persist: {
		debug: true,
	},
	state(): AppPreferences {
		return {
			loopMode: LoopMode.NONE,
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
	},
	actions: {
		nextMode() {
			this.loopMode = nextLoopMode(this.loopMode);
		},
	},
});
