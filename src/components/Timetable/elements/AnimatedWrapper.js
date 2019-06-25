import React from "react";
import PropTypes from "prop-types";
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
    from: { x: 0 },
    height: height,
    x: 1
  });

  return (
    <Wrapper
      style={{
        height: animation.height,
        overflow: animation.x.interpolate(x =>
          x === 1 && !props.isChosen ? "visible" : "hidden"
        )
      }}
    >
      <div {...bind}>{props.children}</div>
    </Wrapper>
  );
};

AnimatedWrapper.propTypes = {
  isChosen: PropTypes.bool.isRequired
};

export default AnimatedWrapper;
