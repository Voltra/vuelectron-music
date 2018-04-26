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
		computed: mapGetters({
			music: Getters.MUSIC
		}),
		asyncComputed: {
			musics(){
				return this.music.all()
				.then(musics => Promise.all(
					musics.map(music => music.id)
					.map(id => this.music.fromDB(id))
				));
			}
		}
	};
</script>
<style lang="scss" scoped>
	@import "~@css/_components/desktop-player/desktop-player";
</style>
