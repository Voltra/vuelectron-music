<script>
	import PlayerProgressBar from "@components/PlayerProgressBar"

	export default {
		name: "desktop-player-bar",
		render(){
			return (
				<div class="desktopPlayerBar">
					<PlayerProgressBar/>
				</div>
			);
		}
	};
</script>
<style lang="scss" scoped>
	@import "~@css/_components/desktop-player-bar/desktop-player-bar";
</style>
