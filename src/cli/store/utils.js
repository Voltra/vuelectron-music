const chalk = require("chalk");
const logSymbols = require("log-symbols");

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


module.exports = {
    success,
    failure,
    inform,
    itemify,
    pathify,
};