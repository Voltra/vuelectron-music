//node src/cli/store.js make:@ --stateName=TEST -g=TEST -m=TEST -so="state/test.js" -go="getters/test.js" -mo="mutations/test.js"

/*************************************************\
	Imports
\*************************************************/
const { promisify } = require("util");
const fs = require("fs");
let { ncp } = require("ncp");
const merge = require("lodash.merge");
const toKebabCase = require("dashify");
const argv = require("yargs");



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
const configFile = "store.config.json";
const defaults = {
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
`
};

grabJSON(configFile)
.then(userConfig => {
    const config = merge(defaults, userConfig);
    const args = argv
    .usage("Usage: store <command> [options]")
    .command("make:@", "Makes a state, a getter and a mutation", makeAllInit(config))
    .command("make:all", "Makes a state, a getter and a mutation", makeAllInit(config))
    .command("make:state", "Makes a state", makeStateInit(config))
    .command("make:getter", "Makes a getter", makeGetterInit(config))
    .command("make:mutation", "Makes a mutation", makeMutationInit(config))
    .help("h")
    .alias("h", "help")
    .demandCommand(1, "You need to use a command")
    .argv;
}).catch(console.error);

class Builder{
    constructor(builder){
        this.builder = builder;
    }

    build(){
        return this.builder;
    }

    withStateName(){
        this.builder.option("stateName", {
            demandOption: true,
            alias: "s",
            describe: "The name to use as the state's key",
            type: "string"
        });

        return this;
    }

    withGetterName(){
        this.builder.option("getterName", {
            demandOption: true,
            alias: "g",
            describe: "The name to use as the getter's key",
            type: "string"
        });

        return this;
    }

    withMutationName(){
        this.builder.option("mutationName", {
            demandOption: true,
            alias: "m",
            describe: "The name to use as the mutation's key",
            type: "string"
        });

        return this;
    }

    withStateOutput(){
        this.builder.option("stateOutput", {
            demandOption: true,
            alias: "so",
            describe: "The path to the output file for the state",
            type: "string"
        });

        return this;
    }

    withGetterOutput(){
        this.builder.option("getterOutput", {
            demandOption: true,
            alias: "go",
            describe: "The path to the output file for the getter",
            type: "string"
        });

        return this;
    }

    withMutationOutput(){
        this.builder.option("mutationOutput", {
            demandOption: true,
            alias: "mo",
            describe: "The path to the output file for the mutation",
            type: "string"
        });

        return this;
    }
}

Builder.from = function(builder){
    return new Builder(builder);
}

function makeAllInit(config){
    return {
        handler: makeAll.bind(null, config),
        builder: build => {
            return Builder.from(build)
            .withStateName()
            .withGetterName()
            .withMutationName()
            .withStateOutput()
            .withGetterOutput()
            .withMutationOutput()
            .build();
        }
    };
}

function makeStateInit(config){
    return {
        handler: makeState.bind(null, config),
        builder: build => {
            return Builder.from(build)
            .withStateName()
            .withStateOutput()
            .build();
        }
    };
}

function makeGetterInit(config){
    return {
        handler: makeGetter.bind(null, config),
        builder: build => {
            return Builder.from(build)
            .withGetterName()
            .withGetterOutput()
            .buid();
        }
    };
}

function makeMutationInit(config){
    return {
        handler: makeMutation.bind(null, config),
        builder: build => {
            return Builder.from(build)
            .withGetterName()
            .withMutationName()
            .withMutationOutput()
            .build();
        }
    };
}

function makeState(config, { stateName, stateOutput }){
    const { root, stateTemplate } = config;
    const content = stateTemplate
    .replace(/%stateName%/g, stateName);

    return fs.writeFile(`${root}/${stateOutput}`, content, "utf-8")
    .then(_ => console.log(`Done: state ${stateName}`));
}

function makeGetter(config, { getterName, getterOutput }){
    const { root, getterTemplate } = config;
    const content = getterTemplate
    .replace(/%getterName%/g, getterName);
    
    return fs.writeFile(`${root}/${getterOutput}`, content, "utf-8")
    .then(_ => console.log(`Done: getter ${getterName}`));
}

function makeMutation(config, { mutationName, stateName, mutationOutput }){
    const { root, mutationTemplate } = config;
    const content = mutationTemplate
    .replace(/%mutationName%/g, mutationName)
    .replace(/%stateName%/g, stateName);

    return fs.writeFile(`${root}/${mutationOutput}`, content, "utf-8")
    .then(_ => console.log(`Done: mutation ${mutationName}`))
}

function makeAll(config, args){
    return makeState(config, args)
    .then(_ => makeGetter(config, args))
    .then(_ => makeMutation(config, args));
}