import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { animated, useTransition } from "react-spring";

import { useRouter } from "./hooks/useRouter";
import StationsProvider from "./StationsProvider";
import Home from "./Home/Home";
import Selection from "./Selection/Selection";

const Routes = () => {
  return (
    <Router>
      <StationsProvider>
        <AnimatedRoutes />
      </StationsProvider>
    </Router>
  );
};

const AnimatedRoutes = () => {
  const { location } = useRouter();

  const transitions = useTransition(location, location => location.pathname, {
    from: {
      opacity: 0,
      position: "absolute",
      width: "100%",
      transform: "translate3d(100%, 0, 0)"
    },
    enter: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(-50%, 0, 0)" }
  });

  return (
    <div
      style={{
        position: "relative",
        overflowX: "hidden",
        height: "100vh"
      }}
    >
      {transitions.map(({ item, props: transitionStyle, key }) => (
        <animated.div key={key} style={transitionStyle}>
          <Switch location={item}>
            <Route path="/" exact component={Home} />
            <Route path="/selection/" exact component={Selection} />
          </Switch>
        </animated.div>
      ))}
    </div>
  );
};

export default Routes;
