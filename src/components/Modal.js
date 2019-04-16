import React, { useRef } from "react";
import PropTypes from "prop-types";
import Portal from "./Portal";
import { useOnClickOutside } from "./hooks/useOnClickOutside";
import { useLockBodyScroll } from "./hooks/useLockBodyScroll";

import "./styles/Modal.scss";

const Modal = props => {
  const { children, setToggle } = props;

  // to keep track of DOM element
  const ref = useRef();

  // custom hook to close modal on click outside
  useOnClickOutside(ref, () => setToggle(false));

  // custom hook to disable scroll while modal is open
  useLockBodyScroll();

  return (
    <Portal>
      <div className="wrapper">
        <div className="modal" ref={ref}>
          {children}
        </div>
      </div>
    </Portal>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  setToggle: PropTypes.func.isRequired
};

export default Modal;
