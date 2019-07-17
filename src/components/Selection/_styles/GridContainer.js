import styled from "styled-components";

import { breakPoints } from "components/_styles/variables";

const GridContainer = styled.main`
  margin: 60px 10px 0 10px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    "header header"
    "outbound outbound"
    "inbound inbound"
    "cart cart";
  grid-row-gap: 15px;

  @media (min-width: ${breakPoints[1]}) {
    margin: 60px 20px 0 20px;
    grid-template-columns: 230px 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      ". header"
      "cart outbound"
      "cart inbound";
    grid-row-gap: 0;
  }
`;

export default GridContainer;
