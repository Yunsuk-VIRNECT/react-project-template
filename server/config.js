const axios = require("axios");

const env = process.env.VIRNECT_ENV;
const configServer = process.env.CONFIG_SERVER;

const envConfig = {};
const urlConfig = {};

const localIp = "localhost";

const localUrls = {
  console: `https://${localIp}:8883`,
  api: "https://10.200.0.24:8073",
  accout: `https://${localIp}:8822`,
  workstation: `https://${localIp}:8878`,
  download: `https://${localIp}:8833`,
  remote: `https://${localIp}:8886`,
  pay: `https://${localIp}:7070`,
  track: `https://${localIp}:8890`,
  minio: "https://10.200.0.25:2838",
  viewer: "https://10.200.0.24:4040",
};

const renewalUrls = {
  api: "https://10.200.0.24:8073",
  console: "https://10.200.0.24:8883",
  account: "https://10.200.0.24:8822",
  admin: "https://10.200.0.24:8884",
  www: "https://10.200.0.24:3000",
  track: "https://10.200.0.24:8890",
  make: "https://10.200.0.24:8755",
  viewer: "https://10.200.0.24:4040",
  workstation: "https://10.200.0.24:8878",
  minio: "https://10.200.0.25:2838",
};
async function getEnvConf() {
  const res = await axios.get(
    `${configServer}/make-web-client/${env === "local" ? "develop" : env}`
  );

  const property = res.data.propertySources[0].source;
  Object.keys(property).forEach(key => {
    if (key.includes("env.")) {
      envConfig[key.replace("env.", "")] = property[key];
    }
  });
}

async function getUrlConf() {
  const res = await axios.get(
    `${configServer}/web-url/${env === "local" ? "develop" : env}`
  );

  const property = res.data.propertySources[0].source;
  Object.keys(property).forEach(key => {
    urlConfig[key.replace("url.", "")] = property[key];
  });

  if (env === "production") return;

  Object.entries(renewalUrls).forEach(([key, v]) => {
    urlConfig[key] = v;
  });
}

module.exports = {
  async init() {
    await Promise.all([getEnvConf(), getUrlConf()]);
  },
  getAsNumber(key) {
    return Number(envConfig[key]);
  },
  getAsString(key) {
    return String(envConfig[key]);
  },
  getAsBoolean(key) {
    return Boolean(envConfig[key]);
  },
  getPort() {
    return process.env.PORT || String(envConfig.PORT);
  },
  getEnv() {
    return env;
  },
  getUrls() {
    return urlConfig;
  },
  getRenewalUrls() {
    if (env === "production") return urlConfig;
    return env === "local" || env === undefined ? localUrls : renewalUrls;
  },
  getConfigs() {
    return {
      ...this.getRenewalUrls(),
      env: this.getEnv(),
      timeout: this.getAsNumber("TIMEOUT"),
    };
  },
};
