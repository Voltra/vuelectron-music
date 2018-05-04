<script>
	import { mapGetters } from "vuex"
	import { Getters } from "@js/store.getters"
	import { Routes } from "@js/router.routes"
	import { MusicEvents } from "@js/models/Music"

	import Playlist from "@components/Playlist"

	export default {
		name: "desktop-player",
		render(){
			return (
				<div>
					<Playlist musics={this.musics}/>
					{this.craftPlayer()}
					<button onClick={::this.removeAll}>Remove all musics</button>
				</div>
			);
		},
		data(){
			return {
				musics: []
			};
		},
		computed: {
			...mapGetters({
				music: Getters.MUSIC/*,
				columns: Getters.COLUMNS*/
			}),
			...{
				columns(){
					return this.$store.getters[Getters.COLUMNS].musics;
				}
			}
		},
		methods: {
			removeAll(){
				this.music.purge();
			},
			craftPlayer(){
				if(this.musics.length)
					return (
						<audio controls>
							<source src={this.musics[0].path}></source>
						</audio>
					);
				else
					return (
						<span>Whoops, no music :x !</span>
					);
			},
			updateMusics(){
				this.music.all()
				.then(musics => Promise.all(
					musics.map(music => music.id)
					.map(id => this.music.fromDB(id))
				))/*.then(musics => Promise.all(
					musics.map(music => music.getData())
				))*/.then(musicsData => {
					if(!musicsData.length){
						this.$router.push({name: Routes.DRAG_N_DROP});
						return Promise.reject("No more music, going back to Drag'n'Drop !");
					}

					this.musics = musicsData;
				});
			}
		},
		created(){
			this.updateMusics();
			Object.values(MusicEvents).forEach(event => this.music.on(event, ::this.updateMusics));
		}
	};
</script>
<style lang="scss" scoped>
	@import "~@css/_components/desktop-player/desktop-player";
</style>
