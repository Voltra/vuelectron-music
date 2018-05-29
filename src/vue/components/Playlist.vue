<script>
	import { mapGetters } from "vuex"
	import { Getters } from "@js/store.getters"
	import PlaylistItem from "@components/PlaylistItem"
	import PlaylistItemCell from "@components/PlaylistItemCell"
	import { th } from "@js/helpers/thtd"

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
										<PlaylistItemCell text={text} classes={classes} type={th}/>
									))
								}
							</tr>
						</thead>
						<tbody class="body" ref="body" v-scrollbar-y data-scrollbar-no-x>
							{
								this.rows.map((music, i) => (
									<PlaylistItem key={music} active={this.isItemActive(i)} music={music} headers={this.headers}/>
								))
							}
						</tbody>
					</table>
				</div>
			);
		},
		data(){
			return {
				sortingFunction: (lhs, rhs)=>Object.compare(lhs.title, rhs.title),
				activeIndex: -1
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
			isItemActive(i){
				if(typeof i != "number")
					throw new TypeError("The given index must be a Number");

				if(parseInt(i) != i)
					throw new TypeError("The given index must be an integer");

				if(i < 0 || i >= this.rows.length)
					throw new Error("The given index must be in the interval [0;length[");

				return i === this.activeIndex;
			},
			updateScrollbars(){
				this.activeIndex = this.getActiveIndex();
				this.$nextTick(()=>{
					this.$refs.body.$scrollbarY.update();
					this.$refs.container.$scrollbarX.update();
				});
			},
			getActiveIndex(){
				if(this.musics.length)
					return Math.floor(Math.random() * this.musics.length) % this.musics.length;

				return -1;
			}
		},
		watch: {
			musics: "updateScrollbars"
		},
		mounted(){
			this.updateScrollbars();
			this.activeIndex = this.getActiveIndex();
			console.log(this);
		}
	};
</script>
<style lang="scss" scoped>
	@import "~@css/_components/playlist/playlist";
</style>
