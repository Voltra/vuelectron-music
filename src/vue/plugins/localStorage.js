import $ls from "$store"

const plugin = {
	install(Vue){
		Object.defineProperties(Vue.prototype, {
			$localStorage: {
				get(){ return $ls; }
			}
		});
	}
};

if(typeof window !== "undefined" && window.Vue)
	Vue.use(plugin);

export default plugin