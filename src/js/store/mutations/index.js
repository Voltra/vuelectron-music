import setSchema from "@js/store/mutations/db/setSchema"
import setDB from "@js/store/mutations/db/setDB"
import colors from "@js/store/mutations/localStorage/colors"
import currentMusic from "@js/store/mutations/music/current"


const mutations = {
    ...setSchema,
    ...setDB,
    ...colors,
    ...currentMusic,
};

export { mutations }