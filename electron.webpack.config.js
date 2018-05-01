/**************************************************************************\
	IMPORTS
\**************************************************************************/
const path = require("path");
const webpack = require("webpack");
const ManifestPlugin = require("webpack-manifest-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");



/**************************************************************************\
	BASE DEFINITIONS
\**************************************************************************/
const dev = (process.env["NODE_ENV"] === "dev");
const thisPath = __dirname;
const config = {};
	config.resolve = {};
		config.resolve.alias = {};
		config.resolve.extensions = [];
	config.entry = {};
	config.output = {};
    config.plugins = [];
	config.module = {};
		config.module.rules = [];
	config.mode = dev ? "development" : "production";
	


/**************************************************************************\
	TARGET
\**************************************************************************/
config.target = "electron-main";
config.node = {
	__dirname: false,
	__filename: false
}



/**************************************************************************\
	ALIASES
\**************************************************************************/
config.resolve.alias["@js"] = path.resolve(thisPath, "src/");
config.resolve.alias["@css"] = path.resolve(thisPath, "src/sass/");

config.resolve.extensions.push(".js");
config.resolve.extensions.push(".esm");
config.resolve.extensions.push(".es6");



/**************************************************************************\
	ENTRIES
\**************************************************************************/
config.entry["index"] = "@js/index.js";



/**************************************************************************\
	OUTPUTS
\**************************************************************************/
config.output["path"] = path.resolve(thisPath, "."); //dist
config.output["filename"] = "index.js";
//config.output["filename"] = dev ? "[name].bundle.js" : "[name].[chunkhash:8].bundle.js";//dev ? "[name].[chunkhash:8].bundle.js" : "[name].bundle.js";
//config.output["publicPath"] = "/assets/js";



/**************************************************************************\
	DEV TOOLS
\**************************************************************************/
config.devtool = dev ? "cheap-module-eval-source-map" : false;



/**************************************************************************\
	MODULES/LOADERS
\**************************************************************************/
const libsRegex = /(node_modules|bower_components)/g

config.module.rules.push({
	test: /\.(js|es6|esm)$/,
	exclude: libsRegex,
	use: [
		"babel-loader"
	]
});

/*config.module.rules.push({
	test: /\.(png|jpe?g|gif|svg)$/,
	exclude: libsRegex,
	use: [
		{
			loader: "url-loader",
			options: {
				limit: 8192,
				name: "[name].[hash:8].[ext]"
			}
		},
		{
			loader: "img-loader",
			options: {
				enabled: !dev
			}
		}
	]
});

config.module.rules.push({
	test: /\.(woff2?|eot|ttf|otf)$/,
	loader: "file-loader"
});
*/
const styleLoaders = ["style-loader", "css-loader"];

config.module.rules.push({
    test: /\.css$/,
    use: styleLoaders
});

const sassLoaders = [...styleLoaders, "sass-loader"/*, "mixin-loader"*/];

config.module.rules.push({
    test: /\.scss$/,
    use: sassLoaders
});

/*
config.module.rules.push({
    test: /\.scss$/,
    enforce: "pre",
    loader: "mixin-loader"
});
config.module.rules.push({
	test: /\.vue$/,
	//exclude: libsRegex,
	loader: "vue-loader",
    options: {
		loaders: {
			css: `vue-style-loader${sassLoaders.map(e=>`!${e}`).join("")}`
		}
	}
});*/



/**************************************************************************\
	MODULES/LOADERS
\**************************************************************************/
config.plugins.push(new ManifestPlugin());
config.plugins.push(new CleanWebpackPlugin(["dist"], {
	root: path.resolve(thisPath, "."),
	verbose: true,
	dry: false,
	exclude: ["globals", "globals/*", "globals/*.*"]
}));

if(!dev)
	config.plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));



/**************************************************************************\
	EXPORT
\**************************************************************************/
module.exports = config;