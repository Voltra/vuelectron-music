import V from "$vue"
import Vx from "vuex"
import Vr from "vue-router"

const Vue = V;
const Vuex = Vx;
const VueRouter = Vr;

Vue.use(Vuex);
Vue.use(VueRouter);

export { Vue, Vuex, VueRouter };