import electron from "electron"
import { app, BrowserWindow, dialog } from "electron"
import url from "url"
import path from "path"
import { server, httpServer } from "@js/server"

const thisPath = __dirname;
const fromRoot = uri => path.resolve(thisPath, `.${uri}`);

const createWindow = (function(app){
	const window = new BrowserWindow({
		backgroundColor: "#0d121a",
		title: "Vuelectron Music",
		width: 700,
		height: 600,
		minWidth: 600,
		minHeight: 600,
		frame: false,
		icon: fromRoot("/icon.ico"),
		hasShadow: true,
		webPreferences: {
			webSecurity: false
		}
	});
	
	window.loadURL(url.format({
		pathname: "localhost:4096",
		protocol: "http:",
		slashes: true
	}));
	
	window.webContents.openDevTools();
	
	window.once("ready-to-show", ::window.show);
}).bind(null, app);

app.on("ready", createWindow);
//app.on("activate", createWindow);
app.on("window-all-closed", ()=>{
	if(process.platform !== "darwin"){
		httpServer.close();
		app.quit();
	}
});