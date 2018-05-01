import {json} from "@js/urls"
import Vue from "$vue"
import Plugins from "@vplugins/plugins"
import {components, componentsArray} from "@js/components"
import {router} from "@js/router"
import {store} from "@js/store"
import {Mutations} from "@js/store.mutations"


import {$json} from "@voltra/json"
import PerfectScrollbar from "perfect-scrollbar"

import {Music} from "@js/models/Music"
import removeSpinnerLord from "@js/helpers/removeSpinnerLord"

import "vue2-animate/dist/vue2-animate.min.css"

(()=>{
	self.Music = Music;

	Promise.all([
		$json.get(json("/db.json"))
	]).then(([dbConfig])=>{
		const {plugins, factories} = Plugins;
		
		[...plugins, ...componentsArray].forEach(e => Vue.use(e));
		return factories["indexedDBFactory"](Vue, dbConfig)
		.then(_ => Promise.resolve([dbConfig]));
	}).then(([dbConfig])=>{		
		const setup = ()=>{			
			const $vm = new Vue({
				el: "#app",
				router,
				store,
				components,
				created(){
					this.$store.commit(Mutations.SET_DB, this.$db);
					this.$store.commit(
						Mutations.SET_SCHEMA,
						Object.entries(dbConfig.schema)
						.map(([table, schema])=>({table, columns: Object.keys(schema.indexes)}))
						.reduce((schema, {table, columns})=>{
							//({...schema, ...{[table]: columns}})
							if(!schema[table])
								schema[table] = [];

							schema[table] = [...schema[table], ...columns];
							return schema;
						}, {})
					);
				},
				mounted(){
					/*const {map} = [];//Array.prototype;
					const makeScrollbarY = e => new PerfectScrollbar(e, {
						suppressScrollX: true,
						maxScrollbarLength: 40
					});

					document.querySelectorAll("[data-scrollbar-y]")
					::map(makeScrollbarY)
					.forEach(e => 
						["resize", "orientationchange"]
						.forEach(event => window.addEventListener(event, ::e.update))
					);*/

					removeSpinnerLord();
				}
			});

			window.$vm = $vm;
			window.Vue = Vue;
		};
		
		if(["complete", "loaded"].includes(document.readyState))
			setup();
		else
			document.addEventListener("DOMContentLoaded", setup);
		
	}).catch(console.error);
})();