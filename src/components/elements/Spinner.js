import React from "react";
import styled, { keyframes } from "styled-components";
import { animated, useSpring } from "react-spring";

import { colors } from "../styles/variables";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
`;

const glow = keyframes`
  0% {
    fill: ${colors.pinkOpacity};
    transform: scale(1);
  }
  50% {
    fill: ${colors.pink};
    transform: scale(0.75);
  }
  100% {
    fill: ${colors.pinkOpacity};
    transform: scale(1);
  }
`;

const GlowingLogo = styled.svg`
  fill: ${colors.pinkOpacity};
  animation: ${glow} 2s 1s infinite;
`;

const AnimatedLogo = animated(GlowingLogo);

const Spinner = () => {
  const fadeIn = useSpring({
    from: {
      transform: "scale(0) rotate(-90deg)"
    },
    transform: "scale(1) rotate(0deg)"
  });

  return (
    <Wrapper>
      <AnimatedLogo
        style={fadeIn}
        width="75"
        height="76"
        viewBox="0 0 28 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M27.9283 12.8135H16.1097V0.0852737L11.8888 4.49773V12.8135H0.0702209V17.0562H11.8888V28.9358H16.1097V17.0562H27.9283V12.8135Z" />
      </AnimatedLogo>
    </Wrapper>
  );
};

export default Spinner;
