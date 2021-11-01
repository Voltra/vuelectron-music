import { Getters } from "@js/store.getters"
import { State } from "@js/store.state"

const e = {
    [Getters.SORTING_CRITERIA](state){
        return state[State.SORTING_CRITERIA];
    }
};

export default e
