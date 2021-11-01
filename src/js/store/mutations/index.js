import setSchema from "@mutations/db/setSchema"
import setDB from "@mutations/db/setDB"
import colors from "@mutations/localStorage/colors"
import currentMusic from "@mutations/music/current"
import currentPlaylist from "@mutations/music/currentPlaylist"
import loaded from "@mutations/misc/loaded"
import sortingCriteria from "@mutations/music/sortingCriteria"
import sortAsc from "@mutations/music/sortAsc"

const mutations = {
    ...setSchema,
    ...setDB,
    ...colors,
    ...currentMusic,
    ...currentPlaylist,
	...loaded,
	...sortingCriteria,
	...sortAsc,
};

export { mutations }
