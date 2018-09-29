<script>
	import { mapGetters } from "vuex"
	import { Getters } from "@js/store.getters"
	import PlaylistItem from "@components/PlaylistItem"
	import PlaylistItemCell from "@components/PlaylistItemCell"
	import { th, td } from "@js/helpers/thtd"

	export default {
		name: "playlist",
		render(){
			this.updateScrollbars();

            //ref:container v-scrollbar-x data-scrollbar-no-y
            //ref:body  v-scrollbar-y data-scrollbar-no-x
			return (
				<div class="playlist" ref="container" data-stealth-scrollbar v-scrollbar-x data-scrollbar-no-y>
					<table>
						<thead class="head">
							<tr>
								{
									this.headers.map(({name, text, classes, shouldListenToEvents}) => (
										<PlaylistItemCell
											uniq={name}
											key={text}
											type={th}
											text={text}
											classes={classes}
											isListenedTo={shouldListenToEvents}
											onClicked={::this.sortByHeader}
										/>
									))
								}
							</tr>
						</thead>
						<tbody class="body" ref="body"  data-stealth-scrollbar v-scrollbar-y data-scrollbar-no-x>
							{
								this.rows.map((music, i) => (
									<PlaylistItem key={music} type={td} active={this.isItemActive(i)} music={music} headers={this.headers}/>
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
				activeIndex: -1,
				sortingCriteria: null, //will initially be set to "title",
				isAscending: false
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
//						{name: "year", text: "year", classes},
						{name: "genre", text: "genre", classes},
						/*{name: "date_added", text: "date added", classes},
						{name: "plays", text: "# of plays", classes},*/
					].map(obj => ({
						...obj,
						classes: [...obj.classes, obj.name],
						shouldListenToEvents: obj.name !== "play"
					}));
				},
				rows(){
					return this.musics.sortBy(this.sortingFunction);
				}
			}
		},
		methods: {
			sortingFunctionFactory(criteria, asc=true){
				if(asc)
					return (lhs, rhs) => Object.compare(lhs[criteria], rhs[criteria]);

				return (lhs, rhs) => Object.compare(rhs[criteria], lhs[criteria]);
			},
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

					// this.$refs.container.$scollbarXY.update();
				});
			},
			getActiveIndex(){
				if(this.musics.length)
					return Math.floor(Math.random() * this.musics.length) % this.musics.length;

				return -1;
			},
			sortByHeader({ uniq }){
				if(this.sortingCriteria === uniq){
					this.isAscending = !this.isAscending;
					this.sortingFunction = this.sortingFunctionFactory(this.sortingCriteria, this.isAscending);
				}else{
					this.isAscending = true;
					this.sortingFunction = this.sortingFunctionFactory(uniq, this.isAscending);
					this.sortingCriteria = uniq;
				}
			}
		},
		watch: {
			musics: "updateScrollbars"
		},
		mounted(){
			this.updateScrollbars();
			this.activeIndex = this.getActiveIndex();
			this.sortByHeader({
				uniq: "title"
			});
			console.log(this);
		}
	};
</script>
<style lang="scss" scoped>
	@import "~@css/_components/playlist/playlist";
</style>
