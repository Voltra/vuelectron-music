import { AbstractLoopStrategy } from "@/js/modules/player/loop/strategy/AbstractLoopStrategy.ts";
import { Music } from "@/js/modules/db";

export class NotLoopingStrategy extends AbstractLoopStrategy {
	public override chooseNextSong(songs: Music[], index: number): number|undefined {
		if (index >= songs.length - 1) {
			return undefined;
		}

		return index + 1;
	}

}
