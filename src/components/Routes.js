import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { animated, useTransition, config } from "react-spring";

// context
import StationsProvider from "components/providers/StationsProvider";

// components
import Home from "./Home/Home";
import Selection from "./Selection/Selection";

// hooks
import { useRouter } from "./hooks/useRouter";

// global styles
import RelativeWrapper from "components/_styles/RelativeWrapper";

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
