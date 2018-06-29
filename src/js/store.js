import { Vuex } from "@js/vueSetup"

import { state } from "@js/store/state"
import { getters } from "@js/store/getters"
import { mutations } from "@js/store/mutations"

const storeFactory = function(){
    const { Store } = Vuex;
    const store = new Store({
        state,
        mutations,
        getters
    });
    return { store };
};


export { storeFactory }