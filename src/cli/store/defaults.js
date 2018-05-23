module.exports = {
    root: "src/store",
    stateTemplate: `import { State } from "@js/store.state"

const e = {
    [State.%stateName%]: null
};

export default e;
`, getterTemplate: `import { Getters } from "@js/store.getters"
import { State } from "@js/store.state"

const e = {
    [Getters.%getterName%](state){
        return null;
    }
};

export default e
`, mutationTemplate: `import { Mutations } from "@js/store.mutations"
import { State } from "@js/store.state"

const e = {
    [Mutations.%mutationName%](state, payload){
        state[State.%stateName%] = payload;
    }
};

export default e
`,
    reg: {
        state: "store.state.js",
        getter: "store.getters.js",
        mutation: "store.mutations.js",
        showFullPath: false
    },
    exports: {
        state: "state/index.js",
        getter: "getters/index.js",
        mutation: "mutations/index.js",
        showFullPath: false
    }
};