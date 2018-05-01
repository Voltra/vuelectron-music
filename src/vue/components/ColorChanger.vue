<script>
	import { Photoshop as PhotoshopColorPicker } from "vue-color"
	import Color from "color"
	import { Getters } from "@js/store.getters"
	import { mapGetters } from "vuex"

	export default {
		name: "color-changer",
		props: {
			cssVar: {
				type: String,
				required: true
			},
			title: {
				type: String,
				required: false,
				default: "Change your color"
			}
		},
		data(){
			return {
				color: this.$cssVar(this.cssVar) || "#fff",
				backupColor: this.$cssVar(this.cssVar) || "#fff",
				cssVarDark: `${this.$props.cssVar}-dark`
			};
		},
		render(){
			return (
				<PhotoshopColorPicker style="margin: auto;" head={this.title} value={this.color} onOk={::this.onOk} onCancel={::this.onCancel} onInput={::this.onInput}/>
			);
		},
		watch: {
			color: "emitChangeEvent",
			backupColor: "emitChangeEvent"
		},
		computed: {
			...mapGetters({
				sass: Getters.SASS
			})
		},
		methods: {
			darken(newValue){
				return Color(newValue.trim()).darken(
					parseFloat(this.sass.darkenAmount) / 20
				).string();
			},
			emitChangeEvent(newValue){
				this.$emit("color", newValue.trim());
				this.updateCssVar(newValue.trim());
			},
			updateCssVar(newValue){
				this.$cssVar(this.cssVar, newValue);
				this.$cssVar(this.cssVarDark, this.darken(newValue));
			},
			onOk(){
				this.backupColor = this.color;
			},
			onCancel(){
				this.color = this.backupColor;
			},
			onInput(newColor){
				const color = (newColor.a && newColor.a != 1.0) ? newColor.rgba : newColor.hex;
				this.color = color;
			}
		},
		beforeDestroy(){
			this.updateCssVar(this.backupColor);
		}
	};
</script>
<style lang="scss">
	@import "~@css/_components/color-changer/color-changer";
</style>
