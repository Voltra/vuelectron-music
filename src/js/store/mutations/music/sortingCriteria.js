import { Mutations } from "@js/store.mutations"
import { State } from "@js/store.state"

const e = {
    [Mutations.SET_SORTING_CRITERIA](state, payload){
        state[State.SORTING_CRITERIA] = payload;
    }
};

export default e
