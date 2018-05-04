<script>
	import ColorChanger from "@components/ColorChanger"

	export default {
		name: "settings-menu",
		data(){
			return {
				colors: [
					{title: "Change your accent color", cssVar: "accent"},
					{title: "Change your background color", cssVar: "bg"},
					{title: "Change your default color", cssVar: "default"},
					{title: "Change your text color", cssVar: "white"},
					{title: "Change your secondary color", cssVar: "secondary"},
				]
			};
		},
		render(){
			return (
				<div class="settings">
					<div class="wrapper" ref="wrapper" v-scrollbar-y>
						<button onClick={::this.exit}>Exit menu</button>
						{
							this.colors.map(({title, cssVar}) => <ColorChanger key={cssVar} title={title} cssVar={cssVar}/>)
						}
					</div>
				</div>
			);
		},
		methods: {
			exit(){
				this.$emit("exit");
			}
		},
		mounted(){
			this.$refs.wrapper.$scrollbarY.update();
		}
	};
</script>
<style lang="scss" scoped>
	@import "~@css/_components/settings-menu/settings-menu";
</style>
