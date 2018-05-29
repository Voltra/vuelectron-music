const { makeState } = require("./state");
const { makeGetter } = require("./getter");
const { makeMutation } = require("./mutation");

const Builder = require("../builder");

function makeAll(config, args){
    return makeState(config, args)
    .then(_ => makeGetter(config, args))
    .then(_ => makeMutation(config, args));
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


module.exports = {
    makeAll,
    makeAllInit
}