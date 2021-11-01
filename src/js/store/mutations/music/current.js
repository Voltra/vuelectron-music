import { Mutations } from "@js/store.mutations"
import { State } from "@js/store.state"

const e = {
    [Mutations.SET_CURRENT_MUSIC](state, payload){
        state[State.CURRENT_MUSIC] = payload;
    }
};

export default e
