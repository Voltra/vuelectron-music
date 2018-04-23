<script>
	export default {
		name: "top-bar-button",
		props: {
			text: {
				type: String,
				required: true
			},
			accent: {
				type: Boolean,
				required: false,
				default: false
			},
			nobg: {
				type: Boolean,
				required: false,
				default: false
			},
			left: {
				type: Boolean,
				required: false,
				default: false
			},
			noshadow: {
				type: Boolean,
				required: false,
				default: false
			},
			action: {
				type: Function,
				required: false,
				default: ()=>{}
			}
		},
		computed: {
			classes(){
				const c = ["topbar__btn", "material-icons"];

				if(this.$props.accent)
					c.push("accent");

				if(this.$props.nobg)
					c.push("nobg");

				if(this.$props.left)
					c.push("left");

				if(this.$props.noshadow)
					c.push("noshadow");


				return c;
			}
		},
		render(){
			return (
				<div class={this.classes} onClick={this.$props.action}>
					<div class="btnText">{this.$props.text}</div>
				</div>
			);
		}
	};
</script>
<style lang="scss" scoped>
	@import "~@css/_components/top-bar-button/top-bar-button";
</style>
