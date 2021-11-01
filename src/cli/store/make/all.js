const { makeState } = require("./state");
const { makeGetter } = require("./getter");
const { makeMutation } = require("./mutation");

const Builder = require("../builder");

function makeAll(config, fs, args){
    return makeState(config, fs, args)
    .then(_ => makeGetter(config, fs, args))
    .then(_ => makeMutation(config, fs, args));
}


function makeAllInit(config, fs){
    return {
        handler: makeAll.bind(null, config, fs),
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


module.exports = {
    makeAll,
    makeAllInit
}