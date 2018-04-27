<script>
	import { ClientTable } from "vue-tables-2"
	import { mapGetters } from "vuex"
	import { Getters } from "@js/store.getters"
	import { Routes } from "@js/router.routes"
	import { MusicEvents } from "@js/models/Music"

	export default {
		name: "desktop-player",
		render(){
			return (
				<div>
					<v-client-table data={this.musics} columns={this.columns} options={this.options}></v-client-table>
					{/*<table>
						<thead>
							<tr>
								{this.columns.musics.map(column => (<th>{column}</th>))}
							</tr>
						</thead>
						<tbody>
							{this.musics.map(music => (
								<tr>
									{Object.values(music).map(data => (<td>{data}</td>))}
								</tr>
							))}
						</tbody>
					</table>*/}
					{this.craftPlayer()}
				</div>
			);
		},
		data(){
			return {
				musics: [],
				options: {}
			};
		},
		computed: mapGetters({
			music: Getters.MUSIC,
			columns: Getters.COLUMNS
		}),
		methods: {
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
				)).then(musics => Promise.all(
					musics.map(music => music.getData())
				)).then(musicsData => {
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
		/*asyncComputed: {
			musics: {
				get(){
					return this.music.all()
					.then(musics => Promise.all(
						musics.map(music => music.id)
						.map(id => this.music.fromDB(id))
					)).then(musics => {
						if(!musics.length){
							this.$router.push({name: Routes.DRAG_N_DROP});
							return Promise.reject("No more music, going back to Drag'n'Drop !");
						}

						return Promise.resolve(musics);
					});
				},
				default: []
			}
		}*/
	};
</script>
<style lang="scss" scoped>
	@import "~@css/_components/desktop-player/desktop-player";
</style>
