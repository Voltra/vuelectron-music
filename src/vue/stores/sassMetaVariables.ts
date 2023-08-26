import sassMetaVariables from "@/scss/variables/_metas.module.scss";
import {defineStore} from "pinia";
import { AppColor, AppTheme } from "@/js/modules/theme";
import { darken } from "@/js/modules/colors";

export interface SassMetaVariables extends AppTheme {
	// General
	transitionDuration: string;
	darkenAmount: string;
}

export const useSassMetaVariables = defineStore("sassMetaVariables", {
	persist: {
		debug: true,
	},
	state(): SassMetaVariables {
		return sassMetaVariables;
	},
	getters: {
		darkenPercentage(state) {
			return parseFloat(state.darkenAmount);
		},
	},
	actions: {
		darken(color: string) {
			return darken(color, parseFloat(this.darkenAmount));
		},
		setBgColor(newBgColor: AppTheme["bg"]) {
			this.bg = newBgColor;
		},
		setDefaultColor(newDefaultColor: AppTheme["default"]) {
			this.default = newDefaultColor;
		},
		setAccentColor(newAccentColor: AppTheme["accent"]) {
			this.accent = newAccentColor;
		},
		setSecondaryColor(newSecondaryColor: AppTheme["secondary"]) {
			this.secondary = newSecondaryColor;
		},
		setWhiteColor(newWhiteColor: AppTheme["white"]) {
			this.white = newWhiteColor;
		},
		setColor<C extends AppColor>(colorName: C, newColor: AppTheme[C]) {
			this[colorName] = newColor;
		}
	},
});
