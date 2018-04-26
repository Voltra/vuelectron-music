import Vuex from "vuex"
import Vue from "vue"
import { Music } from "@js/models/Music"

import { Getters } from "@js/store.getters"
import { Mutations } from "@js/store.mutations"


Vue.use(Vuex)
const { Store } = Vuex;
const store = new Store({
    state: {
        dbSchema: {},
        musicModel: Music
    },
    mutations: {
        [Mutations.SET_SCHEMA](state, schema){
            state.dbSchema = schema; //{...state.dbSchema, ...schema};
        },
        [Mutations.SET_DB](state, $db){
            state.musicModel.setDb($db);
        }
    },
    getters: {
        [Getters.COLUMNS](state){
            return Object.keys(state.dbSchema);
        },
        [Getters.MUSIC](state){
            return state.musicModel;
        }
    }
});


export {store}