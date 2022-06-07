import "@/index.css";
import "@/languages/i18n";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "@/app/store";
import App from "@/components/App";

createRoot(document.getElementById("root") as HTMLDivElement).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
