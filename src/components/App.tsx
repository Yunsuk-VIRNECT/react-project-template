import "./App.scss";

import axios from "axios";
import ConfigContext from "contexts/configContext";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import logo from "../logo.svg";
import Test from "./Test";

const Button = styled.button`
  background: orange;
  color: black;
`;

function App() {
  const { t, i18n } = useTranslation();
  const [configUrl, setConfigUrl] = useState({});

  const fetchConfigUrl = async () => {
    const { data } = await axios.get("/configs");
    console.log(data);
    setConfigUrl(data);
    return data;
  };

  useEffect(() => {
    // every rendering or mount with empty deps or update with deps
    fetchConfigUrl();

    // return {
    // unmount
    // }
  }, []);

  return (
    <ConfigContext.Provider value={configUrl}>
      <div className="app">
        <img className="app-logo" src={logo} alt="logo" />
        <p>test paragraph</p>
        <p>{t("test.tt")}</p>
        <Test />
        <Button>Test Button</Button>
      </div>
    </ConfigContext.Provider>
  );
}

export default App;
