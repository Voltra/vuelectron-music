import {
	createRouter,
	createWebHistory, /*RouteRecordRaw*/
} from "vue-router/auto";
import {routes} from "vue-router/auto-routes";

/*const decorateRoutes = (routes: RouteRecordRaw[]) => {
	routes.forEach(route => {
		route.props = true;

		if (route.children) {
			decorateRoutes(route.children);
		}
	});

	return routes;
};*/

export const router = createRouter({
	routes,
	history: createWebHistory(),
});
