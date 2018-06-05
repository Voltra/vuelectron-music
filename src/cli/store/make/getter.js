const { success, inform, itemify, pathify } = require("../utils");
const Builder = require("../builder");


function makeGetter(config, fs, { getterName, getterOutput, stateName }){
    const { root, getterTemplate, reg, exports } = config;
    const content = getterTemplate
	.replace(/%getterName%/g, getterName)
	.replace(/%stateName%/g, stateName);
    
    const outputPath = `${root}/${getterOutput}`;
    const displayPath = reg.showFullPath ? `${root}/${reg.getter}` : reg.getter;
    const exportsPath = exports.showFullPath ? `${root}/${exports.getter}` : exports.getter;
    return fs.writeFile(outputPath, content, "utf-8")
    .then(_ => success(`made getter ${itemify(getterName)}`))
    .then(_ => inform(`Don't forget to register ${itemify(getterName)} in your ${pathify(displayPath)}`))
    .then(_ => inform(`Don't forget to export ${pathify(outputPath)} in your ${pathify(exportsPath)}`))
    .then(_ => console.log(""));
}

function makeGetterInit(config, fs){
    return {
        handler: makeGetter.bind(null, config, fs),
        builder: build => {
            return Builder.from(build)
			.withGetterName()
			.withStateName()
            .withGetterOutput()
            .buid();
        }
    };
}

module.exports = {
    makeGetter,
    makeGetterInit
};

