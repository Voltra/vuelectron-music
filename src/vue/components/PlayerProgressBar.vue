<script>
	export default {
		name: "player-progress-bar",
		render(){
			return (
				<div class="playerProgressBar" ref="wrapper" onMouseleave={::this.endDrag}>
					<div class="playerProgressBar__rail" ref="rail" onClick={this.handleEvent}>
						<div class="playerProgressBar__progress" ref="progress" style={this.styles} onMousedown={::this.onMousedown} onMouseup={::this.onMouseup}>
							<div class="playerProgressBar__thumb" ref="thumb" onMousedown={::this.onMousedown} onMouseup={::this.onMouseup}></div>
						</div>
					</div>
				</div>
			);
		},
		data(){
			return {
				percentage: 0,
				handleEvent: ::this.onEvent
			};
		},
		computed: {
			styles(){
				return `width: ${this.percentage}%;`
			}
		},
		methods: {
			onEvent(event){
				const { rail } = this.$refs;

				const curX = event.clientX;
				const railRect = rail.getBoundingClientRect();

				const startX = railRect.left;
				const endX = railRect.right;

				this.percentage = this.computePercentage(curX, startX, endX);
			},
			startDrag(event){
				const { wrapper } = this.$refs;
				wrapper.addEventListener("mousemove", this.handleEvent);
			},
			endDrag(event){
				const { wrapper } = this.$refs;
				wrapper.removeEventListener("mousemove", this.handleEvent);
			},
			onMousedown(event){
				this.onEvent(event);
				this.startDrag(event);
			},
			onMouseup(event){
				this.onEvent(event);
				this.endDrag(event);
			},
			computePercentage(pos, begin, end){
				return pos / (end - begin) * 100;
			}
		}
	};
</script>
<style lang="scss" scoped>
	@import "~@css/_components/player-progress-bar/player-progress-bar";
</style>
