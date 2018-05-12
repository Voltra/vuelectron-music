import musicModel from "@js/store/state/music/model"
import currentMusic from "@js/store/state/music/current"
import dbSchema from "@js/store/state/db/schema"
import localStorageColors from "@js/store/state/localStorage/colors"
import sassMetaVariables from "@js/store/state/sass/metaVariables"

const state = {
    ...musicModel,
    ...currentMusic,
    ...dbSchema,
    ...sassMetaVariables,
    ...localStorageColors,
};

export {state}