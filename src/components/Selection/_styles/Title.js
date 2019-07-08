import styled from "styled-components";

import { colors } from "components/_styles/variables";

const Title = styled.h1`
  grid-area: header;
  margin: 38px 0 38px 20px;
  display: flex;
  font-weight: 300;
  font-size: 40px;
  text-transform: uppercase;
  color: ${colors.blue2};

  img {
    margin: auto 24px auto 0;
  }
`;

export default Title;
