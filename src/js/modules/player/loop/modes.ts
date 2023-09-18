import { match } from "ts-pattern";

export enum LoopMode {
	NONE = "Not repeating",
	LOOP_LIST = "Restart at the beginning of the list",
	LOOP_SINGLE = "Play the same song over and over",
}

export const nextLoopMode = (mode: LoopMode) => match(mode)
	.returnType<LoopMode>()
	.with(LoopMode.NONE, () => LoopMode.LOOP_LIST)
	.with(LoopMode.LOOP_LIST, () => LoopMode.LOOP_SINGLE)
	.otherwise(() => LoopMode.NONE);

export const loopModeIcon = (mode: LoopMode) => mode === LoopMode.LOOP_SINGLE ? "sync" : "replay";
