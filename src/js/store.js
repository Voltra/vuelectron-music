import Vuex from "vuex"
import Vue from "vue"

import { state } from "@js/store/state"
import { getters } from "@js/store/getters"
import { mutations } from "@js/store/mutations"


Vue.use(Vuex)
const { Store } = Vuex;
const store = new Store({
    state,
    mutations,
    getters
});


export {store}