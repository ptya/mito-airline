import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";

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

const Switch = props => {
  const [state, toggle] = useState(true);
  const { z } = useSpring({
    to: {
      z: state ? 0 : 180
    }
  });
  const { handler } = props;

  return (
    <Button
      style={{
        transform: z.interpolate(z => `rotateZ(${z}deg)`)
      }}
      onClick={() => {
        toggle(!state);
        handler();
      }}
    >
      <img src={arrows} alt="From - to" />
    </Button>
  );
};

Switch.propTypes = {
  handler: PropTypes.func.isRequired
};

export default Switch;
