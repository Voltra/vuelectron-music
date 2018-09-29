<script>
	import { mapGetters } from "vuex"
	import { Getters } from "@js/store.getters"
	import PlaylistItemCell from "@components/PlaylistItemCell"
	import { td } from "@js/helpers/thtd"

	export default {
		name: "playlist-item",
		render(){
			return (
				<tr class={this.classes}>
					{
						/*this.musicDatas.map(({property, text, classes}) => (
							<td class={classes} title={text}>
								<div class={[...classes, "content"]}>{text}</div>
							</td>
						))*/
						this.musicDatas.map(({property, text, classes}) => (
							<PlaylistItemCell uniq={property} text={text} classes={classes} type={td}/>
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
		methods: {
			transformEntry(entry){
				const copy = {...entry};
				switch(entry.property){
					case "duration":
						copy.text = this.makeDurationFromEntry(entry);
						break;
					
					case "date_added":
						copy.text = this.makeDateFromEntry(entry);
						break;

					default:
						break;
				}

				return copy;
			},
			makeDurationFromEntry(entry){
				const duration = entry.text;
				/*const hours = Math.floor(duration / 3600);
				const mod3600 = duration % 3600;
				const minutes = Math.floor(mod3600 / 60);
				const mod60 = mod3600 % 60;
				const seconds = Math.ceil(mod60 / 60);*/

				const hours = Math.floor(duration / 3600);
				const minutes = Math.floor((duration - hours*3600) / 60);
				const seconds = Math.floor(duration - minutes*60 - hours*3600);

				const hoursStr = `${hours}`.length >= 2 ? hours : `0${hours}`;
				const toStr = num => `${num}`.length == 2 ? num : `0${num}`;
				const minutesStr = toStr(minutes);
				const secondsStr = toStr(seconds);

				return hours ? `${hoursStr}:${minutesStr}:${secondsStr}` : `${minutesStr}:${secondsStr}`;

				/*
				https://stackoverflow.com/questions/8193868/convert-seconds-to-human-readable-time-duration

				const hours = Math.floor(duration / 3600);
				const minutes = Math.floor((duration - hours*3600) / 60);
				const seconds = duration - minutes*60 - hours*3600;
				*/
			},
			makeDateFromEntry(entry){
				const toStr = num => `${num}`.length >= 2 ? num : `0${num}`;

				const date = entry.text;
				const day = toStr(date.getDate());
				const month = toStr(date.getMonth() + 1); //Months start go from 0 to 11 for some obscure reason
				const year = toStr(date.getFullYear());

				return `${day}/${month}/${year}`;
			},
			/*sortBy*/headerName(lhs, rhs){
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
			},
			addAdditionalClasses(entry){
				const copy = {...entry};

				switch(entry.property){
					case "play":
						copy.classes.push("material-icons");
						break;

					default:
						break;
				}

				return copy;
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
					entries.push(["play", "play_arrow"]);

					return entries//[property, text]
					.filter(([property]) => !["path"].includes(property))//[property, text]
					.map(([property, text]) => ({property, text}))//{property, text}
					.sortBy(::this.headerName)//{property, text}
					.map(::this.transformEntry)//{property, text}
					.map((e, i) => ({...e, classes: [...this.headers[i].classes, "item"], ...this.classes, }))//{property, text, classes}
					.map(::this.addAdditionalClasses)//{property, text, classes}

					//{property, text, classes}
				}
			}
		}
	};
</script>
<style lang="scss" scoped>
	@import "~@css/_components/playlist-item/playlist-item";
</style>
