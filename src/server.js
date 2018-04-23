import express from "express"
import path from "path"
import Liquid from "liquidjs"
// const express = require("express")
// const path = require("path")
// const Liquid = require("liquidjs")

const thisPath = __dirname; //corresponds to /assets/js/
const server = express();

const fromRoot = uri => path.resolve(thisPath, `..${uri}`);

server.use(//Use the public folder as web root
	"/",
	express.static(fromRoot("/public"))
);

server.use(//Use this folder as assets root
	"/assets",
	express.static(fromRoot("/assets"))
);

const views = fromRoot("/public");
const engine = Liquid({
	root: views,
	extname: ".twig"
});
server.engine("liquid", engine.express());
server.engine(".twig", engine.express());
server.set("views", views);
server.set("view engine", "liquid");
//server.set("view options", {layout: false});

server.get("/", (rq, res)=>res.render("index.twig"));

const httpServer = server.listen(4096);

export {server, httpServer}