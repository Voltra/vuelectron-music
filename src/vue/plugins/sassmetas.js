const plugin = {
    install(Vue){
        const sass = /*self.*/require("$sassMeta");

        Object.defineProperties(Vue.prototype, {
            $sassMeta: {
                get(){ return sass; }
            }
        });
    }
};

if(typeof window !== "undefined" && window.Vue)
	Vue.use(plugin);

export default plugin;