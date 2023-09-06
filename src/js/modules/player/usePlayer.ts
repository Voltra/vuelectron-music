import { inject } from "vue";
import { PLAYER_INJECTION_KEY } from "@/js/modules/player/definePlayer.ts";

export const usePlayer = () => inject(PLAYER_INJECTION_KEY)!;
