import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Home";
import Selection from "./Selection";
import StationsProvider from "./StationsProvider";

import "./styles/index.scss";

class App extends Component {
  render() {
    return (
      <Router>
        <StationsProvider>
          <Route path="/" exact component={Home} />
          <Route path="/selection/" component={Selection} />
        </StationsProvider>
      </Router>
    );
  }
}

export default App;
