import styled from "styled-components";

import { colors } from "components/styles/variables";

const CancelBtn = styled.button`
  background: ${colors.white};
  border: 0;
  padding: 5px 15px;
  margin: 10px 15px;
  font-weight: bold;
  font-size: 12px;
  text-decoration-line: underline;
  text-transform: uppercase;
  color: ${colors.pink};
  cursor: pointer;
`;

export default CancelBtn;
