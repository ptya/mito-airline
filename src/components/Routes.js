import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { animated, useTransition, config } from "react-spring";

import { useRouter } from "./hooks/useRouter";
import StationsProvider from "./StationsProvider";
import Home from "./Home/Home";
import Selection from "./Selection/Selection";

// global elements
import RelativeWrapper from "components/elements/RelativeWrapper";

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
      width: "100%"
    },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.slow
  });

  return (
    <RelativeWrapper>
      {transitions.map(({ item, props: transitionStyle, key }) => (
        <animated.div key={key} style={transitionStyle}>
          <Switch location={item}>
            <Route path="/" exact component={Home} />
            <Route path="/selection/" exact component={Selection} />
          </Switch>
        </animated.div>
      ))}
    </RelativeWrapper>
  );
};

export default Routes;
