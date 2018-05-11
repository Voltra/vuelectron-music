import { Mutations } from "@js/store.mutations"
import { State } from "@js/store.state"

const e = {
    [Mutations.SET_DB](state, $db){
        state[State.MUSIC_MODEL].setDb($db);
    }
}

export default e