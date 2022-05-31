import bodyParser from "body-parser";

import config from "./config.js";

export default () => ({
  name: "configure-server",
  configureServer(server) {
    server.middlewares.use(
      bodyParser.json({
        limit: "50mb",
      })
    );
    config.init();
    const data = config.getConfigs();
    data.env = "develop";
    data.timeout = 5000;
    server.middlewares.use("/configs", (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
    });
  },
});
