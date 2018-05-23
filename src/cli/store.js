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
const chalk = require("chalk");
const logSymbols = require("log-symbols");

const Builder = require("./store/builder");
const defaults = require("./store/defaults");



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

function success(msg){
    console.log(`${logSymbols.success} ${msg}`);
}

function failure(msg){
    console.error(`${logSymbols.error} ${msg}`);
}

function inform(info){
    console.log(`${logSymbols.info} ${info}`);
}

function itemify(item){
    return `${chalk.cyan(item)}`;
}

function pathify(path){
    return `${chalk.magenta(path)}`;
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
    .then(_ => success(`made state ${itemify(stateName)}`))
    .then(_ => inform(`Don't forget to register ${itemify(stateName)} in your ${pathify(displayPath)}`))
    .then(_ => inform(`Don't forget to export ${pathify(outputPath)} in your ${pathify(exportsPath)}`))
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
    .then(_ => success(`made getter ${itemify(getterName)}`))
    .then(_ => inform(`Don't forget to register ${itemify(getterName)} in your ${pathify(displayPath)}`))
    .then(_ => inform(`Don't forget to export ${pathify(outputPath)} in your ${pathify(exportsPath)}`))
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
    .then(_ => success(`made mutation ${itemify(mutationName)}`))
    .then(_ => inform(`Don't forget to register ${itemify(mutationName)} in your ${pathify(displayPath)}`))
    .then(_ => inform(`Don't forget to export ${pathify(outputPath)} in your ${pathify(exportsPath)}`))
    .then(_ => console.log(""));
}

function makeAll(config, args){
    return makeState(config, args)
    .then(_ => makeGetter(config, args))
    .then(_ => makeMutation(config, args));
}