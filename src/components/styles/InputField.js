import styled from "styled-components";

import { colors } from "./variables";

const InputField = styled.div`
  position: relative;

  input {
    background: ${props => (props.isError ? colors.grey1 : "initial")};
    border: ${props =>
      props.isError ? `2px solid ${colors.pink}` : `1px solid ${colors.grey4}`};
    border-radius: 3px;
    box-shadow: ${props =>
      props.isError ? `0 0 10px ${colors.pinkOpacity}` : ""};
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

  /* .search__input--selection {
    margin: 7px;
  } */
`;

export default InputField;
