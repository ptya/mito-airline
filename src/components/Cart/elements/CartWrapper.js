import styled, { css } from "styled-components";

import { colors } from "components/styles/variables";

const CartWrapper = styled.aside`
  width: 230px;
  color: ${colors.grey6};
  /* background: ${colors.white}; */
  border-top: 1px solid ${colors.grey4};
  ${props =>
    props.area &&
    css`
      grid-area: ${props.area};
    `}
`;

export default CartWrapper;
