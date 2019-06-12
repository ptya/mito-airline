import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Home";
import Selection from "./Selection";
import StationsProvider from "./StationsProvider";
import Background from "./elements/Background";

import GlobalStyle from "./styles/GlobalStyle";
import "./styles/index.scss";

class App extends Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <Background />
        <Router>
          <StationsProvider>
            <Route path="/" exact component={Home} />
            <Route path="/selection/" component={Selection} />
          </StationsProvider>
        </Router>
      </>
    );
  }
}

export default App;
