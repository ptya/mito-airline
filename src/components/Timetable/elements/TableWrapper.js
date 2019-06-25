import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

import { useMeasure } from "../../hooks/useMeasure";

import { colors } from "../../styles/variables";

const Wrapper = styled.div`
  position: relative;
`;

const TableWrapper = props => {
  // animation related
  const [bind, { height }] = useMeasure();
  const animation = useSpring({
    background: colors.white,
    overflow: "hidden",
    height: height
  });

  console.log("height: ", height);

  return (
    <animated.div style={animation}>
      <Wrapper {...bind}>{props.children}</Wrapper>
    </animated.div>
  );
};

export default TableWrapper;
