const express = require("express");
const compression = require("compression");
const path = require("path");
const route = require("./route.js");

const app = express();
const server = require("./server/module.js");

app.use(compression());

app.use(express.static(path.join(__dirname, "dist")));
app.use("/static", express.static(path.join(__dirname, "static")));

app.use(route);

server
  .start(app)
  .then(() => {
    console.log("Web client server start");
  })
  .catch(e => {
    console.error(e);
  });
