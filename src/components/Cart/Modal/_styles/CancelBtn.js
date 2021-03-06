import styled from "styled-components";

import { colors } from "components/_styles/variables";

const CancelBtn = styled.button`
  background: ${colors.white};
  border: 0;
  padding: 5px 15px;
  margin: 10px 15px;
  font-weight: bold;
  font-size: 12px;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-transform: uppercase;
  color: ${colors.pink};
  cursor: pointer;

  &:hover,
  &:active,
  &:focus {
    text-decoration-style: double;
  }
`;

export default CancelBtn;
