import React from "react";

import Routes from "./Routes";
import GlobalStyle from "./styles/GlobalStyle";

import "./styles/index.scss";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Routes />
    </>
  );
};

export default App;
