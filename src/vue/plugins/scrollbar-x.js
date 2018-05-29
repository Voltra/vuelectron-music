import PerfectScrollbar from "perfect-scrollbar"


const plugin = {
    install(Vue){
        const makeScrollbarX = e => new PerfectScrollbar(e, {
            suppressScrollY: true,
            wheelPropagation: true,
            //maxScrollbarLength: 40
        });
        const events = ["resize", "orientationchange"];

        Vue.directive("scrollbar-x", {
            bind(el, binding, vnode){
                const scrollbar = makeScrollbarX(el);
                el.$scrollbarX = scrollbar;
                events.forEach(event => window.addEventListener(event, ::scrollbar.update));
            },
            unbind(el, binding, vnode){
                const scrollbar = el.$scrollbarX;
                events.forEach(event => window.removeEventListener(event, ::scrollbar.update));
            }
        });
    }
};

if(typeof window != "undefined" && window.Vue)
    Vue.use(plugin);


export default plugin;