import React from "react";
import styled from "styled-components";
import { animated, useTransition } from "react-spring";

import { useMeasure } from "components/hooks/useMeasure";

const Wrapper = styled.div`
  position: relative;
`;

const AnimatedWrapper = props => {
  // animation related
  const transition = useTransition(true, null, {
    config: {
      duration: 4000
    },
    from: {
      height: 0,
      overflow: "hidden"
    },
    enter: {
      height: 136
    },
    leave: {
      height: 0,
      overflow: "hidden"
    },
    onRest: {
      overflow: "visible"
    }
  });

  return transition.map(({ key, props: styledProps }) => (
    <animated.div key={key} style={styledProps}>
      {props.children}
    </animated.div>
  ));
};

export default AnimatedWrapper;
