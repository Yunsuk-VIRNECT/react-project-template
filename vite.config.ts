import react from "@vitejs/plugin-react";
import fs from "fs";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

import initConfigUrlServer from "./server/configServer.js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [initConfigUrlServer(), react()],
  esbuild: {
    jsxInject: `import React from 'react'`, // automatically import React in jsx files
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      components: fileURLToPath(new URL("./src/components", import.meta.url)),
      contexts: fileURLToPath(new URL("./src/contexts", import.meta.url)),
    },
  },
  server: {
    open: true,
    port: 8971,
    https: {
      key: fs.readFileSync("./src/ssl/virnect.key"),
      cert: fs.readFileSync("./src/ssl/virnect.crt"),
    },
  },
});
