import styled from "styled-components";

import { breakPoints, colors } from "components/_styles/variables";

const FlightsWrapper = styled.section`
  display: flex;
  padding: 15px 15px 0 15px;
  justify-content: space-between;
  flex-direction: column;
  position: relative;

  div:nth-child(2) {
    border-top: 1px dotted ${colors.grey3};

    :before {
      content: "";
      position: absolute;
      top: -7px;
      right: 0;
      left: 0;
      margin: auto;
      border-top: 10px solid ${colors.white};
      border-left: 10px solid ${colors.white};
      transform: rotate(45deg);
      box-shadow: 1px 1px ${colors.grey3};
      width: 0;
    }
  }

  @media (min-width: ${breakPoints[0]}) {
    flex-direction: row;

    div:nth-child(2) {
      border: unset;
      :before {
        position: unset;
        border: unset;
        box-shadow: unset;
      }
    }
  }
`;

export default FlightsWrapper;
