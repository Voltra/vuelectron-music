<script>
	import { mapGetters } from "vuex"
	import { TableCell, th, td } from "@js/helpers/thtd"

	export default {
		name: "playlist-item-cell",
		render(){
			if(this.$props.type === th)
				return (
					<th class={this.cellClasses} onClick={::this.onClick}>
						{this.renderContent()}
					</th>
				);
			
			return (
				<td class={this.cellClasses} onClick={::this.onClick}>
					{this.renderContent()}
				</td>
			);
		},
		props: {
			uniq: {
				required: true
			},
			type: {
				type: TableCell,
				required: false,
				default: td
			},
			text: {
				type: String,
				required: false,
				default: ""
			},
			classes: {
				required: false,
				default: [],
				validate(e){
					return e instanceof Array
					&& e.every(el => typeof el == "string");
				}
			},
			isListenedTo: {
				required: false,
				type: Boolean,
				default: false
			}
		},
		data(){
			return {
				contentAdditionalClasses: ["content"],
				cellAdditionalClasses: ["cell"]
			};
		},
		computed: {
			...{
				contentClasses(){
					return [
						...this.$props.classes,
						...this.contentAdditionalClasses
					];
				},
				cellClasses(){
					return [
						...this.$props.classes,
						...this.cellAdditionalClasses
					];
				}
			}
		},
		methods: {
			renderContent(){
				const content = this.$props.text;
				
				return (
					<div class={this.contentClasses} title={content}>
						{content}
					</div>
				);
			},
			onClick(){
				if(this.$props.isListenedTo)
					this.$emit("clicked", this.$props);
			}
		}
	};
</script>
<style lang="scss" scoped>
	@import "~@css/_components/playlist-item-cell/playlist-item-cell";
</style>
