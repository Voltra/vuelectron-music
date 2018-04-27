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
				.then(::this.goPlayer)
				.catch(::this.goDragDrop);
			},
			goPlayer(){
				console.log("going player");
				this.$router.push(Routes.PLAYER);
			},
			goDragDrop(){
				console.log("going drag'n'drop");
				this.$router.push(Routes.DRAG_N_DROP);
			}
		},
		mounted(){
			this.mount();
		}
	};
</script>
<style lang="scss" scoped>
	@import "~@css/_components/dispatcher/dispatcher";
</style>
