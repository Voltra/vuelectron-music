import setSchema from "@mutations/db/setSchema"
import setDB from "@mutations/db/setDB"
import colors from "@mutations/localStorage/colors"
import currentMusic from "@mutations/music/current"
import currentPlaylist from "@mutations/music/currentPlaylist"
import loaded from "@mutations/misc/loaded"


const mutations = {
    ...setSchema,
    ...setDB,
    ...colors,
    ...currentMusic,
    ...currentPlaylist,
    ...loaded,
};

export { mutations }