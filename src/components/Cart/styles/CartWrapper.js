import styled, { css } from "styled-components";

import { colors } from "components/styles/variables";

const CartWrapper = styled.aside`
  width: 230px;
  color: ${colors.grey6};
  border-top: 1px solid ${colors.grey4};

  ${props =>
    props.area &&
    css`
      grid-area: ${props.area};
    `}

  ${props =>
    props.isSticky &&
    css`
      position: fixed;
      top: 80px;
    `}
`;

export default CartWrapper;
