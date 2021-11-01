import { Mutations } from "@js/store.mutations"
import { State } from "@js/store.state"

const e = {
    [Mutations.SET_CURRENT_PLAYLIST](state, payload){
        state[State.CURRENT_PLAYLIST] = payload;
    }
};

export default e
