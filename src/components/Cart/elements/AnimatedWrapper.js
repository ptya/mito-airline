import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

import { useMeasure } from "../../hooks/useMeasure";

import { colors } from "components/styles/variables";

const Wrapper = styled(animated.div)`
  background: ${colors.white};
`;

const AnimatedWrapper = props => {
  // animation related
  const [bind, { height }] = useMeasure();
  const animation = useSpring({
    height: height,
    overflow: "hidden"
  });

  return (
    <Wrapper style={animation}>
      <div {...bind}>{props.children}</div>
    </Wrapper>
  );
};

export default AnimatedWrapper;
