import {json} from "@js/urls"
import Vue from "$vue"
import Plugins from "@vplugins/plugins"
import {$json} from "@voltra/json"
import components from "@js/components"
import {router} from "@js/router"
import PerfectScrollbar from "perfect-scrollbar"

(()=>{
	Promise.all([
		$json.get(json("/db.json"))
	]).then(([dbConfig])=>{
		const {plugins, factories} = Plugins;
		
		plugins.forEach(::Vue.use);
		return factories["indexedDBFactory"](Vue, dbConfig)
		.then(_ =>{
			Music.$db = Vue.prototype.$db
			return Promise.resolve([dbConfig]);
		});
	}).then(()=>{		
		const setup = ()=>{			
			const $vm = new Vue({
				el: "#app",
				router,
				components,
				mounted(){
					this.$router.push({name: "drag'n'drop"});

					const {map} = Array.prototype;
					const makeScrollbarY = e => new PerfectScrollbar(e, {
						suppressScrollX: true,
						maxScrollbarLength: 40
					});

					document.querySelectorAll("[data-scrollbar-y]")
					::map(makeScrollbarY)
					.forEach(e => 
						["resize", "orientationchange"]
						.forEach(event => window.addEventListener(event, ::e.update))
					);
				}
			});
			window.$vm = $vm;
		};
		
		if(["complete", "loaded"].includes(document.readyState))
			setup();
		else
			document.addEventListener("DOMContentLoaded", setup);
		
	}).catch(console.error)
})();