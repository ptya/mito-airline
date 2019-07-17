import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { animated } from "react-spring";

// hooks
import { useOnClickOutside } from "components/hooks/useOnClickOutside";
import { useLockBodyScroll } from "components/hooks/useLockBodyScroll";

// global styles
import { colors, zIndex, breakPoints } from "components/_styles/variables";

// global elements
import Portal from "./Portal";

const Wrapper = styled(animated.div)`
  position: absolute;
  top: ${props => `${props.y + 0}px`};
  left: 0;
  background: ${colors.blackOpacity};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${zIndex.modal};
`;

const Main = styled(animated.main)`
  background: ${colors.white};
  border-radius: 3px;
  margin-top: 205px;
  margin-bottom: auto;
  @media (min-width: ${breakPoints[0]}) {
    min-width: 465px;
  }
`;

const Modal = props => {
  const { children, setToggle, animation } = props;
  const opacity = (animation && animation.opacity) || null;
  // to keep track of DOM element
  const ref = useRef();

  // custom hook to close modal on click outside
  useOnClickOutside(ref, () => setToggle(false));

  // custom hook to disable scroll while modal is open
  useLockBodyScroll();

  const y = window.scrollY;

  return (
    <Portal>
      <Wrapper
        y={y}
        style={{
          opacity: opacity && opacity.interpolate(o => o)
        }}
      >
        <Main ref={ref} style={animation}>
          {children}
        </Main>
      </Wrapper>
    </Portal>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  setToggle: PropTypes.func.isRequired,
  animation: PropTypes.object
};

Modal.defaultProps = {
  animation: null
};

export default Modal;
