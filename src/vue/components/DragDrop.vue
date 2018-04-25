<script>
	import {Music} from "@js/models/Music"

	self.Music = Music;

	export default {
		name: "drag-drop",
		data(){
			return {
				iconText: "file_download",
				description: "Drag and drop your music files",
				dragging: false,
				fs: null,
				mm: null
			};
		},
		computed: {
			wrapperClasses(){
				const c = ["wrapper"];

				if(this.dragging)
					c.push("dragging");

				return c;
			}
		},
		render(){
			return (
				<div class="dragdrop">
					<div class={this.wrapperClasses} ref="dropzone" onDrop={::this.onDrop} onDragenter={::this.toggleDragging} onDragleave={::this.toggleDragging}>
						<div class="inner">
							<p class="icon material-icons">{this.iconText}</p>
							<p class="text">
								{this.description}
							</p>
						</div>
					</div>
				</div>
			);
		},
		methods: {
			cleanUpEvent(e){
				if(!e)
					return;

				e.stopPropagation();
				e.preventDefault();
			},
			toggleDragging(e){
				this.cleanUpEvent(e);
				this.dragging = !this.dragging;
			},
			onDrop(e){
				this.cleanUpEvent(e);
				this.toggleDragging(e);
				const files = this.getFilesFromDropEvent(e);
				this.addFiles(files);
				console.log("this: ", this);
				console.log("dropped: ", files);
				console.log("event: ", e);
				this.cleanUpAfterDrop(e);
			},
			cleanUpAfterDrop(e){
				if(!(e instanceof DragEvent))
					return;

				if(e.dataTransfer.items)
					e.dataTransfer.items.clear();
				else
					e.dataTransfer.clearData();
			},
			getFilesFromDropEvent(e){
				if(!(e instanceof DragEvent))
					return [];

				return [].slice.apply(e.dataTransfer.files);
			},
			addFiles(files){
				return Promise.all(//Get stats
					files.map(file => file.path)
					.map(path => {
						return this.fs.realpath(path)
						.then(path => path.replace(/\\/g, "/"))
						.then(path => this.fs.stat(path))
					})
				).then(stats => {//Only keep files
					return stats.filter(stat=>stat.isFile())
					.map((stat, i) => files[i])
				}).then(files => Promise.all(
					files.map(file => file.path)
					.map((path, i) => {
						return this.fs.realpath(path)
						.then(path => path.replace(/\\/g, "/"))
						.then(path => Promise.all([
							Promise.resolve(path),
							this.mm.parseFile(path)
						]));
					})
				)).then(combos => combos.map(([path, meta]) =>({path, meta})))
				.then(combos => {
					if(!combos.length)
						return Promise.reject("No suitable audio files found :x");

					return Promise.all(
						combos.map(({path, meta}) => Music.from(path, meta))
					);
				}).then(musics => Promise.all(
					musics.map(music => music.insert())
				)).then(console.log)
				.catch(console.error);
			}
		},
		mounted(){
			Music.setDb(this.$db);

			const {dropzone} = this.$refs;

			['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop']
			.forEach(event => dropzone.addEventListener(event, ::this.cleanUpEvent));

			this.fs = this.$require("promisify-node")("fs");
			this.mm = this.$require("music-metadata");
		}
	};
</script>
<style lang="scss" scoped>
	@import "~@css/_components/drag-drop/drag-drop";
</style>
