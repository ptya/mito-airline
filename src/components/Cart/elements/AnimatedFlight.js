import React from "react";
import styled from "styled-components";
import { useSpring, animated, config } from "react-spring";

import { colors } from "components/styles/variables";

const Wrapper = styled(animated.div)`
  background: ${colors.white};
`;

// transform rotateX -90 -> 0
// translateY -38 -> 0

const AnimatedFlight = props => {
  // animation related
  const { x, y, xy } = useSpring({
    from: { x: -90, y: -38, xy: [90, 38] },
    x: 0,
    y: 0,
    xy: [0, 0],
    config: config.gentle
    // skew or something
  });

  return (
    <Wrapper
      style={{
        transform: xy.interpolate(
          (x, y) => `translateY(-${y}px) rotateX(-${x}deg)`
        )
        // transform: interpolate(
        //   [x, y],
        //   (x, y) => `rotateX(${x}) translateY(${y})`
        // )
      }}
    >
      {props.children}
    </Wrapper>
  );
};

export default AnimatedFlight;
