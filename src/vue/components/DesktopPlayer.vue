<script>
	import { mapGetters } from "vuex"
	import { Getters } from "@js/store.getters"
	import { Routes } from "@js/router.routes"
	import { MusicEvents } from "@js/models/Music"
	import { Photoshop as PhotoshopColorPicker } from "vue-color"

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
					<PhotoshopColorPicker onOk={::this.changeAccent} onCancel={::this.resetAccent} head={this.pickerTitle} value={this.color} onInput={::this.updateAccent}/>
					<button onClick={::this.removeAll}>Remove all musics</button>
				</div>
			);
		},
		data(){
			return {
				musics: [],
				options: {},
				modalName: "colormodal",
				pickerTitle: "Choose your accent color",
				color: this.$cssVar("accent") || "#fff",
				colorBackup: this.$cssVar("accent") || "#fff"
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
		watch: {
			color(newColor){
				this.$cssVar("accent", newColor);
			}
		},
		methods: {
			removeAll(){
				this.music.purge();
			},
			changeAccent(){
				this.colorBackup = this.color;
			},
			resetAccent(){
				this.color = this.colorBackup;
			},
			updateAccent(newColor){
				const color = (newColor.a && newColor.a != 1.0) ? newColor.rgba : newColor.hex;
				this.color = color;
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
		},
		beforeRouteLeave(to, from, next){
			this.resetAccent();
			this.$nextTick(next);//Call on next tick because we need the watcher to process
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
