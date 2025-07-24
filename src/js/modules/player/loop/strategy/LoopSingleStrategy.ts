import {
	AbstractLoopStrategy
} from "@/js/modules/player/loop/strategy/AbstractLoopStrategy.ts";
import {Music} from "@/js/modules/db";

export class LoopSingleStrategy extends AbstractLoopStrategy {
	// @ts-expect-error TS6133: 'songs' is declared but its value is never read.
	public override chooseNextSong(songs: Music[], index: number): number | undefined {
		return index;
	}
}
