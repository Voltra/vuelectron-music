import { Getters } from "@js/store.getters"
import { State } from "@js/store.state"

const e = {
    [Getters.SASS](state){
        return state[State.SASS_META_VARIABLES];
    }
};

export default e