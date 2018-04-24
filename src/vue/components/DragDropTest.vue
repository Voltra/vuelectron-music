<script>
	export default {
		name: "drag-drop-test",
		data(){
			return {
				dragClass: "drag",
				path: "",
				description: "Drag music folder here",
				files: [],
				fs: null
			};
		},
		methods: {
			onDrop(e){
				e.preventDefault();
				
				this.path = e.dataTransfer.files[0].path.replace(/\\/g, "/");
				const files = this.fs.readdirSync(this.path)
				this.files = files.filter(file => ["mp3", "flac"].some(ext => RegExp(`\.${ext}$`).test(file)));
				
				this.cleanUp(e);
			},
			cleanUp(e){
				if(e.dataTransfer.items)
					e.dataTransfer.items.clear();
				else
					e.dataTransfer.clearData();
			}
		},
		render(){ // data-scrollbar
			return (
				<div class="ddt">
					<form class="dropzone" ref="form">
						<span>{this.description}</span>
					</form>
					<p class="path">{this.path}</p>
					<ul class="files">
						{this.files.map(file => (
							<li class="file" key={file}>
								{file}
								<audio controls>
									<source src={`${this.path}/${file}`}/>
								</audio>
							</li>
						))}
					</ul>
				</div>
			);
		},
		mounted(){
			this.fs = this.$bridge.require("fs");
		
			['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(e=>{
				this.$refs.form.addEventListener(e, function(ev){
					ev.stopPropagation();
					ev.preventDefault();
				}, false);
			});
			
			this.$refs.form.addEventListener("drop", ::this.onDrop);
		}
	};
</script>
<style lang="scss" scoped>
	@import "~@css/_components/drag-drop-test/drag-drop-test";
</style>
