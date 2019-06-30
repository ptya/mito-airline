import styled, { keyframes, css } from "styled-components";

import StyledAutosuggest from "./StyledAutosuggest";

import { colors } from "../styles/variables";

const buzz = keyframes`
  0% {
    transform: translateX(0)
  }
  25% {
    transform: translateX(5px)
  }
  50% {
    transform: translateX(-5px)
  }
  75% {
    transform: translateX(5px)
  }
  100% {
    transform: translateX(0)
  }
`;

const InputField = styled(StyledAutosuggest)`
  position: relative;

  input {
    background: ${props => (props.isError ? colors.grey1 : "initial")};
    border: ${props =>
      props.isError ? `2px solid ${colors.pink}` : `1px solid ${colors.grey4}`};
    border-radius: 3px;
    display: block;
    font-size: 1rem;
    width: 250px;
    height: 50px;
  }

  i {
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    right: 15px;
    pointer-events: none;
  }

  /* ERROR STYLES */
  ${props =>
    props.isError &&
    css`
      box-shadow: 0 0 10px ${colors.pinkOpacity};
      animation: ${buzz} 0.3s ease-in-out;
    `};
`;

export default InputField;
export { buzz };
