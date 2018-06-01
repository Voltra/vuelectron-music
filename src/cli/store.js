//node src/cli/store.js make:@ --stateName=TEST -g=TEST -m=TEST -so="state/test.js" -go="getters/test.js" -mo="mutations/test.js"

/*************************************************\
	Imports
\*************************************************/
const { promisify } = require("util");
const fs = require("fs");
let { ncp } = require("ncp");
const merge = require("lodash.merge");
const toKebabCase = require("dashify");
const yargs = require("yargs");

const Builder = require("./store/builder");
const defaults = require("./store/defaults");

const { makeStateInit } = require("./store/make/state");
const { makeGetterInit } = require("./store/make/getter");
const { makeMutationInit } = require("./store/make/mutation");
const { makeAllInit } = require("./store/make/all");



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
    const makeAllSettings = makeAllInit(config, fs);

    const args = yargs
    .usage("Usage: store <command> [options]")
    .command("make:@", makeAllStr, makeAllSettings)
    .command("make:all", makeAllStr, makeAllSettings)
    .command("make:state", "Makes a state", makeStateInit(config, fs))
    .command("make:getter", "Makes a getter", makeGetterInit(config, fs))
    .command("make:mutation", "Makes a mutation", makeMutationInit(config, fs))
    .help("h")
    .alias("h", "help")
    .demandCommand(1, "You need to use a command")
    .argv;

    console.log("");
    console.log("");
}).catch(console.error);