<script>
	import PlayerProgressBar from "@components/PlayerProgressBar"

	export default {
		name: "desktop-player-bar",
		render(){
			return (
				<div class="desktopPlayerBar">
					<div class="pp uni"></div>
					<div class="pp ani"><PlayerProgressBar/></div>
					<div class="pp uni"></div>
				</div>
			);
		}
	};
</script>
<style lang="scss" scoped>
	@import "~@css/_components/desktop-player-bar/desktop-player-bar";

	.pp{
		float: left;
		height: 100%;

		$uni: 12.5%;
		$ani: 100% - 2*$uni;
		
		&.uni{
			width: $uni;
		}

		&.ani{
			width: $ani;
		}
	}
</style>
