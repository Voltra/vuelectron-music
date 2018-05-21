/*************************************************\
	Imports
\*************************************************/
const {promisify} = require("util");
const fs = require("fs");
let { ncp } = require("ncp");
const merge = require("lodash.merge");
const toKebabCase = require("dashify");



/*************************************************\
	Promisify
\*************************************************/
fs.readFile = promisify(fs.readFile);
fs.writeFile = promisify(fs.writeFile);
fs.rename = promisify(fs.rename);
ncp = promisify(ncp);


/*************************************************\
	Functions
\*************************************************/
const grabJSON = uri => fs.readFile(uri, "utf-8").then(JSON.parse);

/*************************************************\
	Code
\*************************************************/
const configFile = "makeComponent.json";
const makeRE = /^make:([\w@]+)$/i;
const args = parseArgs(process.args());


if(args.command.type === "make"){
    const [makeArg] = args.command.raw.match(makeRE);

    let promise;
    switch(makeArg){
        case "@":
            promise = makeAll(args);
            break;

        case "state":
            promise = makeState(args);
            break;

        case "getter":
            promise = makeGetter(args);
            break;

        case "mutation":
            promise = makeMutation(args);
            break;

        default:
            promise = Promise.reject("Invalid make argument");
            break;
    }

    promise.then(_ => process.exit(0))
    .catch(e => {
        console.error(e);
        process.exit(-1);
    });
}


function parseArgs(args){
    return {
        command: {
            type: "make",
            raw: "make:@"
        }
    };
}

function makeState(args){
    const stateTemplate = `import { State } from "@js/store.state"

const e = {
    [State.%stateName%]: null
};

export default e;
`;

    return Promise.resolve();
}

function makeGetter(args){
    const getterTemplate = `import { Getters } from "@js/store.getters"
import { State } from "@js/store.state"

const e = {
    [Getters.%getterName%](state){
        return null;
    }
};

export default e
`;

    return Promise.resolve();
}

function makeMutation(args){
    const mutationTemplate = `import { Mutations } from "@js/store.mutations"
import { State } from "@js/store.state"

const e = {
    [Mutations.%mutatioName%](state, payload){
        state[State.%stateName%] = payload;
    }
};

export default e
`;

    return Promise.resolve();
}

function makeAll(args){
    return makeState(args)
    .then(_ => makeGetter(args))
    .then(_ => makeMutation(args));
}