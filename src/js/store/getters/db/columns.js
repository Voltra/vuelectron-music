import { Getters } from "@js/store.getters"
import { State } from "@js/store.state"

const e = {
    [Getters.COLUMNS](state){
        return Object.entries(state[State.DB_SCHEMA])
        .map(([table, columns]) => ({table, columns}))
        .reduce((acc, {table, columns})=>{
            acc[table] = columns;
            return acc;
        }, {});
    }
};

export default e