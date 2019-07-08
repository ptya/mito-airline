import styled from "styled-components";

import { colors } from "components/_styles/variables";

const PayBtn = styled.button`
  background: ${props => (props.disabled ? colors.grey3 : colors.pink)};
  border-radius: 3px;
  margin: 20px auto;
  width: 100%;
  height: 50px;
  border: 0;
  color: ${colors.white};
  font-family: "Roboto";
  font-weight: 900;
  font-size: 16px;
  text-transform: uppercase;
  cursor: ${props => (props.disabled ? "initial" : "pointer")};
  transition: background 0.1s ease;

  &:hover,
  &:active,
  &:focus {
    background: ${props => (props.disabled ? colors.grey3 : colors.pinkDark)};
  }

  :active {
    transform: translate3d(1px, 1px, 0);
  }
`;

export default PayBtn;
