import styled from "styled-components";

const GridContainer = styled.main`
  margin: 60px 20px 0 20px;
  display: grid;
  grid-template-columns: 230px 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    ". header"
    "cart outbound"
    "cart inbound";
`;

export default GridContainer;
