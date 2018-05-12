import dbColumns from "@js/store/getters/db/columns"
import musicModel from "@js/store/getters/music/model"
import sassMetaVariables from "@js/store/getters/sass/metaVariables"
import localStorageColors from "@js/store/getters/localStorage/colors"
import currentMusic from "@js/store/getters/music/current"

const getters = {
    ...dbColumns,
    ...musicModel,
    ...sassMetaVariables,
    ...localStorageColors,
    ...currentMusic,
};

export {getters}