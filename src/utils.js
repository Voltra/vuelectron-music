import promisify from "promisify-node"

const fs = promisify("fs");

export function grabJSON(uri){
	return fs.readFile(uri, "utf-8").then(JSON.parse);
}