<script>
	import { mapGetters } from "vuex"
	import { Getters } from "@js/store.getters"
	import PlaylistItem from "@components/PlaylistItem"

	export default {
		name: "playlist",
		render(){
			return (
				<div class="playlist" ref="container" v-scrollbar-x data-scrollbar-no-y>
					<table>
						<thead class="head">
							<tr>
								{
									this.headers.map(({text, classes}) => (
										<th class={classes}>{text}</th>
									))
								}
							</tr>
						</thead>
						<tbody class="body" ref="body" v-scrollbar-y data-scrollbar-no-x>
							{
								this.rows.map(music => <PlaylistItem key={music.id} music={music} headers={this.headers}/>)
							}
						</tbody>
					</table>
				</div>
			);
		},
		data(){
			return {
				sortingFunction: undefined
			};
		},
		props: {
			musics: {
				required: true,
				validate(e){
					return e instanceof Array
					&& e.every(el => el instanceof this.model)
				}
			}
		},
		computed: {
			...mapGetters({
				model: Getters.MUSIC
			}),
			...{
				headers(){
					/*const base = ["header"];

					return [
						{text: "", classes: [...base, "play"]},
						{text: "title", classes: [...base, "title"]},
						{text: "duration", classes: [...base, "duration"]},
						{text: "artist", classes: [...base, "artist"]},
						{text: "album", classes: [...base, "album"]},
						{text: "year", classes: [...base, "year"]},
						{text: "genre", classes: [...base, "genre"]},
						{text: "date added", classes: [...base, "date"]},
						{text: "# of plays", classes: [...base, "plays"]},
					];*/

					const classes = [];

					return [
						{name: "play", text: "", classes},
						{name: "title", text: "title", classes},
						{name: "duration", text: "duration", classes},
						{name: "artist", text: "artist", classes},
						{name: "album", text: "album", classes},
						{name: "year", text: "year", classes},
						{name: "genre", text: "genre", classes},
						{name: "date_added", text: "date added", classes},
						{name: "plays", text: "# of plays", classes},
					].map(obj => ({
						...obj,
						classes: [...obj.classes, obj.name]
					}));
				},
				rows(){
					return this.musics.sortBy(this.sortingFunction);
				}
			}
		},
		methods: {
			updateScrollbars(){
				this.$refs.body.$scrollbarY.update();
				this.$refs.container.$scrollbarX.update();
			}
		},
		watch: {
			musics: "updateScrollbars"
		},
		mounted(){
			this.updateScrollbars();
		}
	};
</script>
<style lang="scss" scoped>
	@import "~@css/_components/playlist/playlist";
</style>
