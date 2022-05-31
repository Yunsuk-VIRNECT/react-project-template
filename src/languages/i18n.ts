import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const files = import.meta.globEager("./**/index.ts");
const resources: any = {};
const exceptName = "./index.ts";

Object.keys(files).forEach(key => {
  if (key !== exceptName) {
    resources[key.replace(/(\.\/|\/index\.ts)/g, "")] = {
      translation: files[key].default,
    };
  }
});

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
