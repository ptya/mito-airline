import styled from "styled-components";

import { breakPoints, colors } from "components/_styles/variables";

const Title = styled.h1`
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0 5px;
  font-weight: 300;
  font-size: 32px;
  text-transform: uppercase;
  color: ${colors.blue2};

  img {
    margin: auto 24px auto 0;
  }

  @media (min-width: ${breakPoints[0]}) {
    margin: 38px 0 38px 20px;
    font-size: 40px;
  }
`;

export default Title;
