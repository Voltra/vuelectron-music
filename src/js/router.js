import VueRouter from "vue-router"
import { components } from "@js/components"
import { Routes } from "@js/router.routes"

const { DragDrop, DesktopPlayer, Dispatcher } = components;


const routes = [
    {name: Routes.DRAG_N_DROP, path: "/drag-drop", component: DragDrop},
    {name: Routes.PLAYER, path:"/player", component: DesktopPlayer},
    {path: "/", component: Dispatcher}
];

const router = new VueRouter({
    routes
});

// router.beforeEach((to, from, next)=>{
//     console.log("from: ", from);
//     console.log("to: ", to);
//     next();
// });

export { routes, router };