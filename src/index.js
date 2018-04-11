import electron from "electron"
import { app, BrowserWindow } from "electron"

function createWindow(app){
	const window = new BrowserWindow({
		width: 700,
		height: 400,
		frame: false
	});
	
	window.show();
}

const createApp = createWindow.bind(null, app);

app.on("ready", createApp);