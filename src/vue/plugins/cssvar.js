const plugin = {
    install(Vue){
        Vue.prototype.$cssVar = (variable, value) => {
            let varname = variable;
            if(/^\w+(?:\w|-)*$/.test(varname))
                varname = `--${varname}`;

            if(/^--\w+(?:\w|-)*$/.test(varname)){
                if(["string", "number"].includes(typeof value) && value===value)
                    document.documentElement.style.setProperty(varname, value);
                else
                    return getComputedStyle(document.documentElement).getPropertyValue(varname);
            }
        }
    }
};

if(typeof window != "undefined" && window.Vue)
    Vue.use(plugin);

export default plugin;