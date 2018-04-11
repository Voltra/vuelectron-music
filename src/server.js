import express from "express"
import path from "path"

const thisPath = __dirname; //corresponds to /assets/js/
const server = express();

const fromRoot = uri => `../..${uri}`;

server.configure(()=>{
	server.use(//Use the public folder as web root
		"/",
		express.static(path.resolve(thisPath, fromRoot("/public")))
	);

	server.use(//Use this folder as assets root
		"/assets"
		express.static(path.resolve(thisPath, fromRoot("/assets")
	);
});

server.get("/", (rq, res)->res.render("index.html"));

server.listen(80);

export {server}