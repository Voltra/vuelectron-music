/*************************************************\
	Imports
\*************************************************/
//const promisify = require("promisify-node");
const {promisify} = require("util");
const fs = require("fs");//promisify("fs");
/*const*/let { ncp } = require("ncp");//promisify("ncp");
const merge = require("lodash.merge");
const toKebabCase = require("dashify");

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
const configFile = "./mc.config.json";
const vueTemplate = `<script>
	export default {
		name: "%name%",
		render(){
			return (
				<div></div>
			);
		}
	};
</script>
<style lang="scss" scoped>
	@import "%stylePath%/%name%/%name%";
</style>
`;

const args = process.argv.splice(process.execArgv.length + 2);


if(args.length < 1)
	throw new Error("Expects at least one argument: {call to this prgm} {component name} {component registration name (optional)}");

const componentName = args[0];
const componentRegName = args.length >= 2 ? args[1] : toKebabCase(componentName);


grabJSON(configFile)
.then(userConfig => {
	if(typeof userConfig != "object" || userConfig == null || userConfig instanceof Array)
		throw new Error("Invalid config file");
	
	return Promise.resolve(userConfig);
}).then(userConfig => {
	const defaults = {
		stylesLocation: "./dev/sass/_components",
		stylesTemplate: "./dev/sass/_structureTemplate",
		stylesImport: "~@css/_components/",
		fileToRename: {
			name: "RENAME_ME",
			extension: "scss"
		},
		componentsPath: "./dev/vue"
	};
	
	const config = merge({}, defaults, userConfig);
	const {stylesLocation, stylesTemplate, stylesImport, componentsPath, fileToRename} = config;
	
	const componentStylePath = `${stylesLocation}/${componentRegName}`;
	return ncp(stylesTemplate, componentStylePath, {
		stopOnErr: true
	}).then(()=>Promise.resolve(config));
}).then(config => {
	const { stylesImport, stylesLocation, fileToRename, componentsPath } = config;
	const { extension, name } = fileToRename;
	
	const componentStylePath = `${stylesLocation}/${componentRegName}`;
	
	const oldPath = `${componentStylePath}/${name}.${extension}`;
	const newPath = `${componentStylePath}/${componentRegName}.${extension}`;
	
	return fs.rename(oldPath, newPath).then(()=>Promise.resolve(config));
}).then(config => {
	const { stylesImport, componentsPath } = config;
	
	const content = vueTemplate
	.replace(/%name%/g, componentRegName)
	.replace(/%stylePath%/g, stylesImport);
	
	const fileName = `${componentName}.vue`;
	const filePath = `${componentsPath}/${fileName}`;
	
	return fs.writeFile(filePath, content, "utf-8");
}).then(()=>console.log(`Component created: ${componentName}  (${componentRegName})`))
.catch(console.error);