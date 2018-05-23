import dbColumns from "@js/store/getters/db/columns"
import musicModel from "@js/store/getters/music/model"
import sassMetaVariables from "@js/store/getters/sass/metaVariables"
import localStorageColors from "@js/store/getters/localStorage/colors"
import currentMusic from "@js/store/getters/music/current"
import currentPlaylist from "@getters/music/currentPlaylist"

const getters = {
    ...dbColumns,
    ...musicModel,
    ...sassMetaVariables,
    ...localStorageColors,
    ...currentMusic,
    ...currentPlaylist,
};

export {getters}