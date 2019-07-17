import styled, { css } from "styled-components";

import { colors, breakPoints } from "components/_styles/variables";

const CartWrapper = styled.aside`
  color: ${colors.grey6};
  border-top: 1px solid ${colors.grey4};

  ${props =>
    props.area &&
    css`
      grid-area: ${props.area};
    `}

  @media (min-width: ${breakPoints[1]}) {
    width: 230px;
    ${props =>
      props.isSticky &&
      css`
        position: fixed;
        top: 80px;
      `}
  }
`;

export default CartWrapper;
