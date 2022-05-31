import "./index.css";
import "./languages/i18n";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./components/App";

createRoot(document.getElementById("root") as HTMLDivElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
