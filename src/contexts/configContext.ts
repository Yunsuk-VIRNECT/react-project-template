import { createContext } from "react";

interface ConfigUrl {
  accout?: string;
  api?: string;
  console?: string;
  download?: string;
  env?: string;
  minio?: string;
  pay?: string;
  remote?: string;
  timeout?: string;
  track?: string;
  viewer?: string;
  workstation?: string;
}

export default createContext({} as ConfigUrl);
