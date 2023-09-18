import { LoopMode } from "@/js/modules/player/loop/index.js";
import { match } from "ts-pattern";
import { LoopListStrategy } from "@/js/modules/player/loop/strategy/LoopListStrategy.ts";
import { AbstractLoopStrategy } from "@/js/modules/player/loop/strategy/AbstractLoopStrategy.ts";
import { NotLoopingStrategy } from "@/js/modules/player/loop/strategy/NotLoopingStrategy.ts";
import { LoopSingleStrategy } from "@/js/modules/player/loop/strategy/LoopSingleStrategy.ts";

export const getLoopStrategy = (loopMode: LoopMode): AbstractLoopStrategy => match(loopMode)
	.with(LoopMode.NONE, () => new NotLoopingStrategy())
	.with(LoopMode.LOOP_LIST, () => new LoopListStrategy())
	.with(LoopMode.LOOP_SINGLE, () => new LoopSingleStrategy())
	.exhaustive();
