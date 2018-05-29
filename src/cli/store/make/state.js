const { success, inform, itemify, pathify } = require("../utils");
const Builder = require("../builder");

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

module.exports = {
    makeState,
    makeStateInit
};