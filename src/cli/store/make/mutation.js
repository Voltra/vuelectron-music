const { success, inform, itemify, pathify } = require("../utils");
const Builder = require("../builder");

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

module.exports = {
    makeMutation,
    makeMutationInit
};