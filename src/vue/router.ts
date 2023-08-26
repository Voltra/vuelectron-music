import {
	createRouter,
	createWebHistory,
} from "vue-router/auto";
import { RouteRecordRaw } from "vue-router/auto";

const decorateRoutes = (routes: RouteRecordRaw[]) => {
	routes.forEach(route => {
		route.props = true;

		if (route.children) {
			decorateRoutes(route.children);
		}
	});

	return routes;
};

export const router = createRouter({
	history: createWebHistory(),
	extendRoutes: decorateRoutes,
});
