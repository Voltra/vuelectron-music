import musicModel from "@state/music/model"
import currentMusic from "@state/music/current"
import dbSchema from "@state/db/schema"
import localStorageColors from "@state/localStorage/colors"
import sassMetaVariables from "@state/sass/metaVariables"
import currentPlaylist from "@state/music/currentPlaylist"
import loaded from "@state/misc/loaded"

const state = {
    ...musicModel,
    ...currentMusic,
    ...dbSchema,
    ...sassMetaVariables,
    ...localStorageColors,
    ...loaded,
};

export {state}