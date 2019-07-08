import styled, { css } from "styled-components";

import { colors } from "components/_styles/variables";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  padding: 15px;
  background: ${colors.white};

  ${props =>
    props.isSeparated &&
    css`
      border-top: 1px dotted ${colors.grey3};

      &:before {
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
    `};
`;

export default Wrapper;
