import PerfectScrollbar from "perfect-scrollbar"


const plugin = {
    install(Vue){
        const makeScrollbarY = e => new PerfectScrollbar(e, {
            suppressScrollX: true,
            wheelPropagation: true,
            //maxScrollbarLength: 40
        });
        const events = ["resize", "orientationchange"];

        Vue.directive("scrollbar-y", {
            bind(el, binding, vnode){
                const scrollbar = makeScrollbarY(el);
                el.$scrollbar = scrollbar;
                console.log(el);
                events.forEach(event => el.addEventListener(event, ::scrollbar.update));
            },
            unbind(el, binding, vnode){
                const scrollbar = el.$scrollbar;
                events.forEach(event => el.removeEventListener(event, ::scrollbar.update));
            }
        });
    }
};

if(typeof window != "undefined" && window.Vue)
    Vue.use(plugin);


export default plugin;