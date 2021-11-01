import { Getters } from "@js/store.getters"
import { State } from "@js/store.state"

const e = {
    [Getters.SORT_ASC](state){
        return state[State.SORT_ASC];
    }
};

export default e
