import Vuex from "vuex"
import Vue from "vue"
import { Music } from "@js/models/Music"

import { Getters } from "@js/store.getters"
import { Mutations } from "@js/store.mutations"

import sassMetaVariables from "@css/_variables/metas"


Vue.use(Vuex)
const { Store } = Vuex;
const store = new Store({
    state: {
        dbSchema: {},
        musicModel: Music,
        sassMetaVariables,
        colorsStorage: null
    },
    mutations: {
        [Mutations.SET_SCHEMA](state, schema){
            state.dbSchema = schema; //{...state.dbSchema, ...schema};
        },
        [Mutations.SET_DB](state, $db){
            state.musicModel.setDb($db);
        },
        [Mutations.SET_COLORS_STORAGE](state, storage){
            state.colorsStorage = storage;
        }
    },
    getters: {
        [Getters.COLUMNS](state){
            return Object.entries(state.dbSchema)
            .map(([table, columns]) => ({table, columns}))
            .reduce((acc, {table, columns})=>{
                acc[table] = columns;
                return acc;
            }, {});
        },
        [Getters.MUSIC](state){
            return state.musicModel;
        },
        [Getters.SASS](state){
            return state.sassMetaVariables;
        },
        [Getters.COLORS_STORAGE](state){
            return state.colorsStorage;
        }
    }
});


export {store}