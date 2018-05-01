<script>
	import TopBarButton from "@components/TopBarButton"
	import SettingsMenu from './SettingsMenu.vue';

	export default {
		name: "top-bar",
		data(){
			return {
				closeText: "close",
				maximizeText: "web_asset",
				minimizeText: "remove",
				menuText: "menu",
				window: null,
				settingsOpened: false
			}
		},
		mounted(){
			this.window = this.$bridge.getCurrentWindow();
		},
		methods: {
			close(){
				this.window.close();
			},
			minimize(){
				this.window.minimize();
			},
			toggleMaximize(){
				if(this.window.isMaximized())
					this.window.unmaximize();
				else
					this.window.maximize();
			},
			showSettings(){
				this.settingsOpened = true;
			},
			hideSettings(){
				this.settingsOpened = false;
			}
		},
		computed: {
			menu(){
				if(this.settingsOpened)
					return (
						<transition name="fade">
							<SettingsMenu onExit={::this.hideSettings}/>
						</transition>
					);
				else
					return "";
			}
		},
		render(){
			return (
				<div class="topbar">
					<div class="left">
						<TopBarButton text={this.menuText} action={::this.showSettings} nobg={true} left={true} noshadow={true}/>
					</div>
					<div class="dragHandle"></div>
					<div class="right">
						<TopBarButton text={this.minimizeText} action={::this.minimize}/>
						<TopBarButton text={this.maximizeText} action={::this.toggleMaximize}/>
						<TopBarButton text={this.closeText} accent={true} action={::this.close}/>
					</div>

					{this.menu}
				</div>
			);
		}
	};
</script>
<style lang="scss" scoped>
	@import "~@css/_components/top-bar/top-bar";
</style>
