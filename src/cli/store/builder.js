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

module.exports = Builder;