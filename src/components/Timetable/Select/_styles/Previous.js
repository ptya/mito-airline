import styled from "styled-components";

import { colors, breakPoints } from "components/_styles/variables";

const Previous = styled.div`
  flex-basis: 25%;
  margin: 0;
  cursor: pointer;

  button {
    font-weight: bold;
    font-size: 13px;
    display: flex;
    color: ${colors.grey5};
    text-transform: uppercase;
    border: 0;
    background: ${colors.white};
    cursor: pointer;
  }

  img {
    width: 18px;
    margin-right: 8px;
    cursor: pointer;
  }

  span {
    margin: auto 0;
    cursor: pointer;
  }

  @media (min-width: ${breakPoints[0]}) {
    margin: auto 12px;
  }
`;

export default Previous;
