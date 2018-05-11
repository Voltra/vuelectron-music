import { Getters } from "@js/store.getters"
import { State } from "@js/store.state"

const e = {
    [Getters.CURRENT_MUSIC](state){
        return state[State.CURRENT_MUSIC];
    }
};

export default e