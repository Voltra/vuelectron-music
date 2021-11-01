import { Mutations } from "@js/store.mutations"
import { State } from "@js/store.state"

const e = {
    [Mutations.SET_LOADED_STATE](state, payload){
        state[State.LOADED] = payload;
    }
};

export default e
