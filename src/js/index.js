import {json} from "@js/urls"
import Vue from "$vue"
import Plugins from "@vplugins/plugins"
import {$json} from "@voltra/json"
import components from "@js/components"
<<<<<<< HEAD
import PerfectScrollbar from "perfect-scrollbar"
=======
>>>>>>> c5a222ab85a6e690922c26171bbd8fb25387b5e0

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
<<<<<<< HEAD
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
=======
				//template: "<p></p>",
				components
>>>>>>> c5a222ab85a6e690922c26171bbd8fb25387b5e0
			});
			window.$vm = $vm;
		};
		
		if(["complete", "loaded"].includes(document.readyState))
			setup();
		else
			document.addEventListener("DOMContentLoaded", setup);
		
	}).catch(console.error)
})();