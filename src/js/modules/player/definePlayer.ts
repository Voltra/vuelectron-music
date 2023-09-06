import { Ref, InjectionKey, provide } from "vue";
import { Nullable } from "@/types";
import { AudioPlayer } from "@/js/modules/player/AudioPlayer.ts";

export const AUDIO_EL_INJECTION_KEY: InjectionKey<Ref<Nullable<HTMLAudioElement>>> = Symbol.for("vuelectron-music::audio-el");
export const PLAYER_INJECTION_KEY: InjectionKey<Ref<Nullable<AudioPlayer>>> = Symbol.for("vuelectron-music::player");

export const definePlayer = (audioRef: Ref<Nullable<HTMLAudioElement>>) => {
	provide(AUDIO_EL_INJECTION_KEY, audioRef);

	const player = computed(() => audioRef.value ? new AudioPlayer(audioRef.value) : null);

	provide(PLAYER_INJECTION_KEY, player);
};
