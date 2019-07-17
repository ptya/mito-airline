import styled from "styled-components";

import { colors, breakPoints } from "components/_styles/variables";

const Day = styled.h3`
  font-size: 16px;
  color: ${colors.grey5};
  font-weight: normal;
  text-align: center;

  @media (min-width: ${breakPoints[0]}) {
    text-align: unset;
    font-size: 18px;
  }
`;

export default Day;
