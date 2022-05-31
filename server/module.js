const https = require("https");
const http = require("http");
const path = require("path");
const fs = require("fs");
const logger = require("@virnect/logger");
const config = require("./config.js");

const ServerModule = (() => {
  let instance;

  let VIRNECT_ENV;
  let SSL_ENV;
  let PORT;

  function onError(err) {
    try {
      switch (err.code) {
        case "EACCES":
          logger.error(`${err.code}`, "ERROR");
          logger.error(`requires elevated privileges.`, "ERROR");
          break;
        case "EADDRINUSE":
          logger.error(`${err.code}`, "ERROR");
          logger.error(`port ${PORT} already in use.`, "ERROR");
          break;
        default:
          throw err;
      }
      process.exit(1);
    } catch (e) {
      throw err;
    }
  }

  function onClose(err) {
    logger.error(`server is closing...`, "CLOSE");
    logger.error(`${err}`, "CLOSE");
  }

  function onListening() {
    logger.info(`server is running...`, "LISTENING");
    logger.ipInfo(`${PORT}`, "LISTENING");
    logger.info(`VIRNECT_ENV: ${VIRNECT_ENV}`, "LISTENING");
    logger.info(`SSL_ENV: ${SSL_ENV}`, "LISTENING");

    const urls = config.getConfigs();
    // delete urls.runtime
    Object.keys(urls).forEach(key => {
      logger.info(`${key.toUpperCase()}: ${urls[key]}`, "LISTENING");
    });
  }

  function onProcessError(err) {
    logger.error(`${err.message}`, "PROCESS_ERROR");
    logger.error(`${err.stack}`, "PROCESS_ERROR");
    process.exit(1);
  }

  async function start(app) {
    await config.init();

    VIRNECT_ENV = process.env.VIRNECT_ENV || "production";
    SSL_ENV = config.getAsString("SSL_ENV") || "public";
    PORT = config.getPort() || 8755;

    return new Promise((resolve, reject) => {
      process.on("uncaughtException", onProcessError);

      const options = {
        key: fs.readFileSync(path.join("./ssl/virnect.key")),
        cert: fs.readFileSync(path.join("./ssl/virnect.crt")),
      };

      try {
        if (SSL_ENV === "public") {
          instance = http.createServer(app);
        } else {
          instance = https.createServer(options, app);
        }

        instance
          .on("listening", onListening)
          .on("close", onClose)
          .on("error", onError);

        instance.listen(PORT);

        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  return {
    start,
  };
})();

module.exports = ServerModule;
