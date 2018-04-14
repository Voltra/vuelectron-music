import {json} from "@js/urls"
import Vue from "$vue"
import Plugins from "@vplugins/plugins"
import {$json} from "@voltra/json"

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
				template: "<p></p>"
			});
			window.$vm = $vm;
		};
		
		if(["complete", "loaded"].includes(document.readyState))
			setup();
		else
			document.addEventListener("DOMContentLoaded", setup);
		
	}).catch(console.error)
})();