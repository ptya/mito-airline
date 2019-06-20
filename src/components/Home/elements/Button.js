import styled from "styled-components";

import { colors } from "../../styles/variables";

const Button = styled.button`
  background: ${colors.blue1};
  border: 0;
  border-radius: 3px;
  box-shadow: 2px 2px 2px ${colors.grey7};
  font-family: Roboto;
  color: ${colors.white};
  font-size: 18px;
  font-weight: 500;
  grid-column: 1 / 3;
  justify-self: center;
  text-transform: uppercase;
  height: 50px;
  width: 230px;
  cursor: pointer;
`;

export default Button;
