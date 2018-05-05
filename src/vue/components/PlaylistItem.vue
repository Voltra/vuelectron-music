<script>
	import { mapGetters } from "vuex"
	import { Getters } from "@js/store.getters"

	export default {
		name: "playlist-item",
		render(){
			return (
				<tr class={this.classes}>
					{
						this.musicDatas.map(({property, text, classes}) => (
							<td class={classes}>{text}</td>
						))
					}
				</tr>
			);
		},
		props: {
			music: {
				required: true,
				validate(e){
					return e instanceof this.model;
				}
			},
			active: {
				type: Boolean,
				required: false,
				default: false
			},
			headers: {
				required: true,
				validate(e){
					return e instanceof Array
					&& e.every(el => el.text && el.classes);
				}
			}
		},
		computed: {
			...mapGetters({
				model: Getters.MUSIC
			}),
			...{
				path(){
					return this.$props.music.path;
				},
				classes(){
					const c = ["playlist__item"];

					if(this.$props.active)
						c.push("active");

					return c;
				},
				musicDatas(){
					const music = this.$props.music;
					const entries = Object.entries(music.getData());
					entries.push(["play", ">"]);

					return entries
					.filter(([property]) => !["path"].includes(property))
					.map(([property, text]) => ({property, text}))
					.sortBy((lhs, rhs) => {
						const lhsTitle = lhs.property;
						const rhsTitle = rhs.property;
						const titles = this.headers.map(({name}) => name);
						const lhsIndex = titles.indexOf(lhsTitle);
						const rhsIndex = titles.indexOf(rhsTitle);

						if(lhsIndex < rhsIndex)
							return -1;
						else if(lhsIndex === rhsIndex)
							return 0;
						else
							return 1;
					}).map(entry => {
						if(entry.property === "duration"){
							const duration = entry.text;
							const hours = Math.floor(duration / 3600);
							const mod3600 = duration % 3600;
							const minutes = Math.floor(mod3600 / 60);
							const mod60 = mod3600 % 60;
							const seconds = Math.ceil(mod60 / 60);

							const hoursStr = `${hours}`.length >= 2 ? hours : `0${hours}`;
							const toStr = num => `${num}`.length == 2 ? num : `0${num}`;
							const minutesStr = toStr(minutes);
							const secondsStr = toStr(seconds);

							const formattedDuration = hours ? `${hoursStr}:${minutesStr}:${secondsStr}` : `${minutesStr}:${secondsStr}`;
							entry.text = formattedDuration;
						}

						if(entry.property === "date_added"){
							const toStr = num => `${num}`.length >= 2 ? num : `0${num}`;

							const date = entry.text;
							const day = toStr(date.getDate());
							const month = toStr(date.getMonth() + 1);
							const year = toStr(date.getFullYear());

							entry.text = `${day}/${month}/${year}`;
						}

						return entry;
					}).map((e, i) => ({...e, classes: this.headers[i].classes}));

					//{property, text, classes}
				}
			}
		}
	};
</script>
<style lang="scss" scoped>
	@import "~@css/_components/playlist-item/playlist-item";
</style>
