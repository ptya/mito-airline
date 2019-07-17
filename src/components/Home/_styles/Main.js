import styled from "styled-components";

import { colors, breakPoints } from "components/_styles/variables";

const Main = styled.main`
  background: ${colors.white};
  box-shadow: 2px 2px 2px ${colors.grey7};
  margin: auto;
  width: 100%;

  @media (min-width: ${breakPoints[0]}) {
    height: 365px;
    width: 570px;
  }
`;

export default Main;
