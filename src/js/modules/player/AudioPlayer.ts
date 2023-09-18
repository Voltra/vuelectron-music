import { Ref, ref } from "vue";
import { Nullable } from "@/types";
import { fromEvent, map, Observable, skip, tap } from "rxjs";
import { Music } from "@/js/modules/db";

export interface ChangeTrackOptions {
	/**
	 * @default true
	 */
	play: boolean;
}

export class AudioPlayer {
	public readonly isPlaying: Ref<Nullable<boolean>>;
	public readonly reachEnd$: Observable<unknown>;

	/**
	 * Player progress as a number within [0;1]
	 */
	public readonly progress$: Observable<number>;

	constructor(
		public readonly audio: HTMLAudioElement
	) {
		this.isPlaying = ref<boolean>(!this.audio.paused);

		const onPlay = () => {
			this.isPlaying.value = true;
		};

		const onStop = () => {
			this.isPlaying.value = false;
		};

		this.audio.addEventListener("play", onPlay);
		this.audio.addEventListener("pause", onStop);
		this.audio.addEventListener("ended", onStop);

		let _magic = false;
		this.reachEnd$ = fromEvent(this.audio, "ended")
			.pipe( // Used so Vue properly trigger changes when using `useObservable`
				tap(() => {
					_magic = !_magic;
				}),
				map(() => _magic)
			);

		this.progress$ = fromEvent(this.audio, "timeupdate")
			.pipe(
				skip(1),
				map(() => this.audio.currentTime / this.audio.duration)
			);
	}

	/**
	 * Change the current active track, and potentially play it
	 * @param newSrc
	 * @param options
	 */
	async changeTrack(newSrc: string, {
		play = true,
	}: Partial<ChangeTrackOptions> = {}): Promise<void> {
		await this.pause();
		this.audio.src = newSrc;

		if (play) {
			try {
				this.audio.load();
			} catch(e) {
				console.error(e);
			}

			await this.play();
		}
	}

	async playMusic(music: Music, {
		play = true,
	}: Partial<ChangeTrackOptions> = {}) {
		return this.changeTrack(music.path, { play });
	}

	async togglePlay() {
		if (this.audio.paused) {
			return this.play();
		} else {
			return this.pause();
		}
	}

	async play(): Promise<void> {
		if (!this.audio.paused) {
			return;
		}

		return this.audio.play();
	}

	async pause(): Promise<void> {
		if (this.audio.paused) {
			return;
		}

		return this.audio.pause();
	}

	/**
	 * @param percentage - A number in the range [0;1]
	 */
	seek(percentage: number) {
		this.audio.currentTime = percentage * this.audio.duration;
	}

	/**
	 * @param percentage - A number in the range [0;1]
	 */
	setVolume(percentage: number) {
		this.audio.volume = percentage;
	}

	toggleMute() {
		this.audio.muted = !this.audio.muted;
	}

	mute() {
		this.audio.muted = true;
	}

	unmute() {
		this.audio.muted = false;
	}
}
