<script>
	import { mapGetters } from "vuex"
	import { TableCell, th, td } from "@js/helpers/thtd"

	export default {
		name: "playlist-item-cell",
		render(){
			if(this.$props.type === th)
				return (
					<th class={this.cellClasses}>
						{this.renderContent()}
					</th>
				);
			
			return (
				<td class={this.cellClasses}>
					{this.renderContent()}
				</td>
			);
		},
		props: {
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
			}
		}
	};
</script>
<style lang="scss" scoped>
	@import "~@css/_components/playlist-item-cell/playlist-item-cell";
</style>
