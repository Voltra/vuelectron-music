const plugin = {
    install(Vue){
        const { remote } = self.require("electron");

        Object.defineProperties(Vue.prototype, {
            $bridge: {
                get(){ return remote; }
            }
        });
    }
};

if(typeof window !== "undefined" && window.Vue)
	Vue.use(plugin);

export default plugin;