<script>
	import TopBar from "@components/TopBar"

	export default {
		name: "app",
		render(){
			return (
				<div class="app">
					<TopBar/>
					{this.$slots.default}
				</div>
			);
		}
	};
</script>
<style lang="scss" scoped>
	@import "~@css/_components/app/app";
</style>
