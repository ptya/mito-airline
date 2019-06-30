import React, { useState } from "react";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";

// import { colors } from "components/styles/variables";

// assets
import arrows from "assets/images/arrows.svg";

const Button = styled(animated.button)`
  border: 0;
  background-color: initial;
  cursor: pointer;

  img {
    width: 30px;
    margin: auto 0;
  }
`;

const Switch = () => {
  const [state, toggle] = useState(true);
  const { z } = useSpring({
    to: {
      z: state ? 0 : 180
    }
  });

  return (
    <Button
      style={{
        transform: z.interpolate(z => `rotateZ(${z}deg)`)
      }}
      onClick={() => toggle(!state)}
    >
      <img src={arrows} alt="From - to" />
    </Button>
  );
};

export default Switch;
