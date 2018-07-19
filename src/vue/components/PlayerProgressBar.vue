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
				this.percentage = this.computePercentage(event, rail);
			},
			startDrag(event){
				const { wrapper, thumb } = this.$refs;
				wrapper.addEventListener("mousemove", this.handleEvent);
				thumb.classList.add("active");
			},
			endDrag(event){
				const { wrapper, thumb } = this.$refs;
				wrapper.removeEventListener("mousemove", this.handleEvent);
				thumb.classList.remove("active");
			},
			onMousedown(event){
				this.onEvent(event);
				this.startDrag(event);
			},
			onMouseup(event){
				this.onEvent(event);
				this.endDrag(event);
			},
			computePercentage(event, element){
				const elemRect = element.getBoundingClientRect();
				const { left, width } = elemRect;
				const { x } = event;

				console.log(`x: ${x}, width: ${width}, left: ${left}`);

				const tmp = (x - left) / width * 100;
				return tmp < 0
				? 0
				: tmp > 100
					? 100
					: tmp;
			}
		}
	};
</script>
<style lang="scss" scoped>
	@import "~@css/_components/player-progress-bar/player-progress-bar";
</style>
