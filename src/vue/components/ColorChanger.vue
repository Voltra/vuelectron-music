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
				color: null,
				backupColor: null,
				cssVarDark: `${this.$props.cssVar}-dark`
			};
		},
		render(){
			return (
				<PhotoshopColorPicker style="margin: auto;" head={this.title} value={this.color} hasResetButton={true} 
				onOk={::this.onOk} onCancel={::this.onCancel} onInput={::this.onInput} onReset={::this.onReset}/>
			);
		},
		watch: {
			color: "emitChangeEvent",
			backupColor: "emitChangeEvent"
		},
		computed: {
			...mapGetters({
				sass: Getters.SASS,
				localStorage: Getters.COLORS_STORAGE
			})
		},
		methods: {
            reset(soft = true){
                this.color = soft
                ? this.localStorage.get(this.cssVar) || this.$cssVar(this.cssVar) || "#fff"
                : this.sass[this.cssVar];
                this.backupColor = this.color;
            },
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
				const darkened = this.darken(newValue);

				this.$cssVar(this.cssVar, newValue);
				this.$cssVar(this.cssVarDark, darkened);
			},
			onOk(){
				this.backupColor = this.color;
				this.saveInPersistantStorage(this.color);
			},
			onCancel(){
				this.color = this.backupColor;
				this.saveInPersistantStorage(this.backupColor);
			},
			onInput(newColor){
				const color = (newColor.a && newColor.a != 1.0) ? newColor.rgba : newColor.hex;
				this.color = color;
			},
			onReset(){
				this.reset(false);
                this.onOk();
			},
			saveInPersistantStorage(value){
				const darkened = this.darken(value);
				this.localStorage.set(this.cssVar, value);
				this.localStorage.set(this.cssVarDark, darkened);
			}
		},
		created(){
			this.reset();
		},
		beforeDestroy(){
			this.updateCssVar(this.backupColor);
		}
	};
</script>
<style lang="scss">
	@import "~@css/_components/color-changer/color-changer";
</style>
