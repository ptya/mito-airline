import React from "react";
import styled from "styled-components";
import { useSpring, animated, config } from "react-spring";

import { colors } from "components/styles/variables";

const Wrapper = styled(animated.div)`
  background: ${colors.white};
`;

const AnimatedFlight = props => {
  // animation related
  const { xy } = useSpring({
    from: { xy: [90, 38] },
    xy: [0, 0],
    config: config.gentle
  });

  return (
    <Wrapper
      style={{
        transform: xy.interpolate(
          (x, y) => `translateY(-${y}px) rotateX(-${x}deg)`
        )
      }}
    >
      {props.children}
    </Wrapper>
  );
};

export default AnimatedFlight;
