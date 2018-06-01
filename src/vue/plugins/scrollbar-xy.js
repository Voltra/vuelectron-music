import PerfectScrollbar from "perfect-scrollbar"


const plugin = {
    install(Vue){
        const makeScrollbar = e => new PerfectScrollbar(e, {
            wheelPropagation: true,
            //maxScrollbarLength: 40
        });
        const events = ["resize", "orientationchange"];

        Vue.directive("scrollbar-xy", {
            bind(el, binding, vnode){
                const scrollbar = makeScrollbar(el);
                el.$scrollbarXY = scrollbar;
                events.forEach(event => window.addEventListener(event, ::scrollbar.update));
            },
            unbind(el, binding, vnode){
                const scrollbar = el.$scrollbarXY;
                events.forEach(event => window.removeEventListener(event, ::scrollbar.update));
            }
        });
    }
};

if(typeof window != "undefined" && window.Vue)
    Vue.use(plugin);


export default plugin;