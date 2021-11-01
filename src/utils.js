import promisify from "promisify-node"
import path from "path"
const fs = promisify("fs");

export function grabJSON(uri){
	return fs.readFile(uri, "utf-8").then(JSON.parse);
}

const thisPath = __dirname;
export function fromRoot(uri){
	return path.resolve(thisPath, `..${uri}`);
}