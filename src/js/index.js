import {json} from "@js/urls"
import Vue from "$vue"
import Plugins from "@vplugins/plugins"
import {$json} from "@voltra/json"
import components from "@js/components"
import PerfectScrollbar from "perfect-scrollbar"

(()=>{
	Promise.all([
		$json.get(json("/db.json"))
	]).then(([dbConfig])=>{
		const {plugins, factories} = Plugins;
		
		plugins.forEach(::Vue.use);
		factories["indexedDBFactory"](Vue, dbConfig);
		
		return Promise.resolve([dbConfig]);
	}).then(()=>{		
		const setup = ()=>{			
			const $vm = new Vue({
				el: "#app",
				components,
				mounted(){
					const {map} = Array.prototype;
					const makeScrollbar = e => new PerfectScrollbar(e, {
						suppressScrollX: true,
						maxScrollbarLength: 40
					});

					document.querySelectorAll("[data-scrollbar]")
					::map(makeScrollbar)
					.forEach(e => e.update());
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