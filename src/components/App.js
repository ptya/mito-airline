import React from "react";

import Routes from "./Routes";
import Background from "./elements/Background";
import GlobalStyle from "./styles/GlobalStyle";

import "./styles/index.scss";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Background />
      <Routes />
    </>
  );
};

export default App;
