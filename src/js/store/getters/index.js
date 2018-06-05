import dbColumns from "@getters/db/columns"
import musicModel from "@getters/music/model"
import sassMetaVariables from "@getters/sass/metaVariables"
import localStorageColors from "@getters/localStorage/colors"
import currentMusic from "@getters/music/current"
import currentPlaylist from "@getters/music/currentPlaylist"
import loaded from "@getters/misc/loaded"
import sortingCriteria from "@getters/music/sortingCriteria"
import sortAsc from "@getters/music/sortAsc"

const getters = {
    ...dbColumns,
    ...musicModel,
    ...sassMetaVariables,
    ...localStorageColors,
    ...currentMusic,
    ...currentPlaylist,
	...loaded,
	...sortingCriteria,
	...sortAsc,
};

export {getters}
