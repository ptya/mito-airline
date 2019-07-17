import styled from "styled-components";

import { breakPoints } from "components/_styles/variables";

const Route = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  font-size: 18px;
  margin: 12px 15px;
  overflow: hidden;

  .route-leaving {
    display: block;
    text-transform: uppercase;
    font-size: 10px;
    flex-grow: 1;
  }

  span {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  @media (min-width: ${breakPoints[0]}) {
    margin: 12px 40px;
    font-size: 20px;
  }
`;

export default Route;
