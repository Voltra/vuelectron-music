import { Getters } from "@js/store.getters"
import { State } from "@js/store.state"

const e = {
    [Getters.MUSIC](state){
        return state[State.MUSIC_MODEL];
    }
};

export default e