import VueRouter from "vue-router"
import components from "@js/components"

const { DragDrop } = components;

const routes = [
    {name: "drag'n'drop", path: "/drag-drop", component: DragDrop}
];

const router = new VueRouter({
    routes
});

export { routes, router };