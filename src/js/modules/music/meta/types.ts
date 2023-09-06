export type DurationString = `${string}:${string}:${string}` | `${string}:${string}`;

export interface MusicMeta {
	/**
	 * The readable FS path/URL to the music file
	 */
	path: string;

	/**
	 * The name of the song
	 */
	title: string;

	/**
	 * The name of the artist
	 */
	artist: string;

	/**
	 * The formatted duration of the song
	 */
	duration: DurationString | "";

	/**
	 * The comma-separated list of the song's genres
	 */
	genre: string;

	/**
	 * The album the song is from
	 */
	album: string;
}
