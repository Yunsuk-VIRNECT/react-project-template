import ConfigContext from "contexts/configContext";

function Test() {
  return (
    <ConfigContext.Consumer>
      {configUrl => <div className="App">{configUrl.api}</div>}
    </ConfigContext.Consumer>
  );
}

export default Test;
