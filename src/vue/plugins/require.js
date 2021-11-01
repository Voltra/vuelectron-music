const plugin = {
    install(Vue){
        Object.defineProperties(Vue.prototype, {
            $require: {
                get(){ return self.require; }
            }
        });
    }
};

if(typeof window !== "undefined" && window.Vue)
	Vue.use(plugin);

export default plugin;