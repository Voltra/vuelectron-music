import { AbstractLoopStrategy } from "@/js/modules/player/loop/strategy/AbstractLoopStrategy.ts";
import { Music } from "@/js/modules/db";

export class LoopListStrategy extends AbstractLoopStrategy {
	public override chooseNextSong(songs: Music[], index: number): number|undefined {
		return (index + 1) % songs.length;
	}
}
