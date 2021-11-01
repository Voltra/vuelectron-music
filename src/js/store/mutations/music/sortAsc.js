import { Mutations } from "@js/store.mutations"
import { State } from "@js/store.state"

const e = {
    [Mutations.SHOULD_SORT_ASC](state, payload){
        state[State.SORT_ASC] = !!payload;
    }
};

export default e
