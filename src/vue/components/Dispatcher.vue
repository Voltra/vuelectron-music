<script>
	import { mapGetters } from "vuex"
	import { Getters } from "@js/store.getters"
	import { Routes } from "@js/router.routes"

	export default {
		name: "dispatcher",
		render(){
			return (
				<div class="dispatcher">
				</div>
			);
		},
		computed: mapGetters({
			music: Getters.MUSIC
		}),
		methods: {
			mount(){
				this.music.hasData()
				.then(_ => this.$router.push({name: Routes.PLAYER}))
				.catch(_ => this.$router.push({name: Routes.DRAG_N_DROP}));
			}
		},
		mounted(){
			// if(false)//already has music
			// 	next({name: "player"});
			// else
			// 	next({name: "drag'n'drop"});
			
			this.mount();
		}/*,
		beforeRouteEnter(to, from, next){
			next(vm => vm.mount());
		}*/
	};
</script>
<style lang="scss" scoped>
	@import "~@css/_components/dispatcher/dispatcher";
</style>
