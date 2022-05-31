const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const config = require("./server/config.js");
const { metaHEAD } = require("./server/meta.js");

const acceptLang = req => {
  const lang = req.acceptsLanguages("ko", "en");
  if (lang) return lang;
  return "en";
};

const formHtml = fs.readFileSync("./dist/index.html", "utf8");

router.get("/healthcheck", (req, res) => {
  res.send("200");
});

router.get("/configs", (req, res) => {
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(config.getConfigs()));
});

router.get("/*", (req, res) => {
  const lang = acceptLang(req);
  res.header("X-Frame-Options", "deny");
  if (req.headers["user-agent"].indexOf("rv:11.0") > -1) {
    res.sendFile(path.join(__dirname, `/dist/apps/error/${lang}.html`));
  } else {
    res.send(metaHEAD(formHtml, lang));
  }
});

module.exports = router;
