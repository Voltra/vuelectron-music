<script>
	import { ClientTable } from "vue-tables-2"
	import { mapGetters } from "vuex"
	import { Getters } from "@js/store.getters"

	export default {
		name: "desktop-player",
		render(){
			return (
				<div>
					<ClientTable data={this.musics} columns={this.columns}/>
				</div>
			);
		},
		data(){
			return {
				//musics: []
			};
		},
		computed: mapGetters({
			music: Getters.MUSIC
		}),
		methods: {
			updateMusic(){
				this.music.all()
				.then(musics => Promise.all(
					musics.map(music => music.id)
					.map(id => this.music.fromDB(id))
				)).then(musics => this.musics = musics)
				.catch(console.error);
			}
		},
		asyncComputed: {
			musics: {
				get(){
					return this.music.all()
					.then(musics => Promise.all(
						musics.map(music => music.id)
						.map(id => this.music.fromDB(id))
					));
				},
				default: []
			}
		},
		/*mounted(){
			this.updateMusic();
		}*/
	};
</script>
<style lang="scss" scoped>
	@import "~@css/_components/desktop-player/desktop-player";
</style>
