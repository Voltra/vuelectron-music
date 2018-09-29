import { json } from "@js/urls"
import { Vue } from "@js/vueSetup"
import { plugins, factories } from "@vplugins"
import { components, componentsArray } from "@js/components"
import { router } from "@js/router"
import { storeFactory } from "@js/store"
import { Mutations } from "@js/store.mutations"


import { $json } from "@voltra/json"

import { Music, Playlist, PlaylistMusic } from "@js/models"
import removeSpinnerLord from "@js/helpers/removeSpinnerLord"
import installPrototypeExtensions from "@js/helpers/prototypes"

import "vue2-animate/dist/vue2-animate.min.css"
import "@css/globals.scss"

(()=>{
	installPrototypeExtensions();
	self.Music = Music;
	self.Playlist = Playlist;
	self.PlaylistMusic = PlaylistMusic;

	Promise.all([
		$json.get(json("/db.json"))
	]).then(([dbConfig]) => {		
		[...plugins, ...componentsArray].forEach(e => Vue.use(e));
		return factories["indexedDBFactory"](Vue, dbConfig)
		.then(_ => Promise.resolve([dbConfig]));
	}).then(([dbConfig]) => {
		const { store } = storeFactory();
		
		const setup = ()=>{
			const $vm = new Vue({
				el: "#app",
				router,
				store,
				components,
				created(){
					//Uses the shared DB as the models' DB
					this.$store.commit(Mutations.SET_DB, this.$db);

					//Defines the schema of the DB
					this.$store.commit(
						Mutations.SET_SCHEMA,
						Object.entries(dbConfig.schema)
						.map(([table, schema])=>({table, columns: Object.keys(schema.indexes)}))
						.reduce((schema, {table, columns})=>{
							if(!schema[table])
								schema[table] = [];

							schema[table] = [...schema[table], ...columns];
							return schema;
						}, {})
					);

					//Defines the namespace of the localStorage reserved to theming
					this.$store.commit(
						Mutations.SET_COLORS_STORAGE,
						this.$localStorage.namespace("vm").namespace("colors")
					);
				},
				mounted(){
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