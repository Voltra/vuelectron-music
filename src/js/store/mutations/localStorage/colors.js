import { Mutations } from "@js/store.mutations"
import { State } from "@js/store.state"

const e = {
    [Mutations.SET_COLORS_STORAGE](state, storage){
        state[State.COLORS_STORAGE] = storage;
    }
};

export default e