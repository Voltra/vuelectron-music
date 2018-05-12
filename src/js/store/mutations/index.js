import setSchema from "@js/store/mutations/db/setSchema"
import setDB from "@js/store/mutations/db/setDB"
import colors from "@js/store/mutations/localStorage/colors"


const mutations = {
    ...setSchema,
    ...setDB,
    ...colors,
};

export {mutations}