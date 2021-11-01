import { Getters } from "@js/store.getters"
import { State } from "@js/store.state"

const e = {
    [Getters.COLORS_STORAGE](state){
        return state[State.COLORS_STORAGE];
    }
};

export default e