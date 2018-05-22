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

grabJSON(configFile)
.then(userConfig => {
    const config = merge(defaults, userConfig);
    const makeAllStr = "Makes a state, a getter and a mutation";
    const makeAllSettings = makeAllInit(config);
    const args = argv
    .usage("Usage: store <command> [options]")
    .command("make:@", makeAllStr, makeAllSettings)
    .command("make:all", makeAllStr, makeAllSettings)
    .command("make:state", "Makes a state", makeStateInit(config))
    .command("make:getter", "Makes a getter", makeGetterInit(config))
    .command("make:mutation", "Makes a mutation", makeMutationInit(config))
    .help("h")
    .alias("h", "help")
    .demandCommand(1, "You need to use a command")
    .argv;

    console.log("");
    console.log("");
}).catch(console.error);

class Builder{
    static from(builder){
        return new Builder(builder);
    }

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
            .withStateName()
            .withMutationName()
            .withMutationOutput()
            .build();
        }
    };
}

function makeState(config, { stateName, stateOutput }){
    const { root, stateTemplate, reg, exports } = config;
    const content = stateTemplate
    .replace(/%stateName%/g, stateName);

    const outputPath = `${root}/${stateOutput}`;
    const displayPath = reg.showFullPath ? `${root}/${reg.state}` : reg.state;
    const exportsPath = exports.showFullPath ? `${root}/${exports.state}` : exports.state;
    return fs.writeFile(outputPath, content, "utf-8")
    .then(_ => console.log(`Done: state ${stateName}`))
    .then(_ => console.log(`Don't forget to register ${stateName} in your ${displayPath}`))
    .then(_ => console.log(`Don't forget to export ${outputPath} in your ${exportsPath}`))
    .then(_ => console.log(""));
}

function makeGetter(config, { getterName, getterOutput }){
    const { root, getterTemplate, reg, exports } = config;
    const content = getterTemplate
    .replace(/%getterName%/g, getterName);
    
    const outputPath = `${root}/${getterOutput}`;
    const displayPath = reg.showFullPath ? `${root}/${reg.getter}` : reg.getter;
    const exportsPath = exports.showFullPath ? `${root}/${exports.getter}` : exports.getter;
    return fs.writeFile(outputPath, content, "utf-8")
    .then(_ => console.log(`Done: getter ${getterName}`))
    .then(_ => console.log(`Don't forget to register ${getterName} in your ${displayPath}`))
    .then(_ => console.log(`Don't forget to export ${outputPath} in your ${exportsPath}`))
    .then(_ => console.log(""));
}

function makeMutation(config, { mutationName, stateName, mutationOutput }){
    const { root, mutationTemplate, reg, exports } = config;
    const content = mutationTemplate
    .replace(/%mutationName%/g, mutationName)
    .replace(/%stateName%/g, stateName);

    const outputPath = `${root}/${mutationOutput}`;
    const displayPath = reg.showFullPath ? `${root}/${reg.mutation}` : reg.mutation;
    const exportsPath = exports.showFullPath ? `${root}/${exports.mutation}` : exports.mutation;
    return fs.writeFile(outputPath, content, "utf-8")
    .then(_ => console.log(`Done: mutation ${mutationName}`))
    .then(_ => console.log(`Don't forget to register ${mutationName} in your ${displayPath}`))
    .then(_ => console.log(`Don't forget to export ${outputPath} in your ${exportsPath}`))
    .then(_ => console.log(""));
}

function makeAll(config, args){
    return makeState(config, args)
    .then(_ => makeGetter(config, args))
    .then(_ => makeMutation(config, args));
}