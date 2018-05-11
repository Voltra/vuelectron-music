import { Mutations } from "@js/store.mutations"
import { State } from "@js/store.state"

const e = {
    [Mutations.SET_SCHEMA](state, schema){
        state[State.DB_SCHEMA] = schema;
    }
}

export default e