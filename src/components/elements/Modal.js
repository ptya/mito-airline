import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// hooks
import { useOnClickOutside } from "components/hooks/useOnClickOutside";
import { useLockBodyScroll } from "components/hooks/useLockBodyScroll";

// global styles
import { colors, zIndex } from "components/styles/variables";

// global elements
import Portal from "./Portal";

const Wrapper = styled.div`
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

const Main = styled.main`
  background: ${colors.white};
  border-radius: 3px;
  margin-top: 205px;
  margin-bottom: auto;
  min-width: 465px;
`;

const Modal = props => {
  const { children, setToggle } = props;

  // to keep track of DOM element
  const ref = useRef();

  // custom hook to close modal on click outside
  useOnClickOutside(ref, () => setToggle(false));

  // custom hook to disable scroll while modal is open
  useLockBodyScroll();

  const y = window.scrollY;

  return (
    <Portal>
      <Wrapper y={y}>
        <Main ref={ref}>{children}</Main>
      </Wrapper>
    </Portal>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  setToggle: PropTypes.func.isRequired
};

export default Modal;
