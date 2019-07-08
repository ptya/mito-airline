import styled from "styled-components";

import { colors } from "components/_styles/variables";

import TableGrid from "./TableGrid";

const TableRow = styled(TableGrid)`
  border-top: 1px solid ${colors.grey3};
  background: ${props => (props.isDisabled ? colors.grey4 : colors.white)};

  .time {
    color: ${colors.grey6};
    font-weight: 300;
    font-size: 15px;
    margin: auto 0;

    img {
      width: 16px;
      margin: auto 6px;
    }
  }

  .standard {
    background: ${props => (props.isDisabled ? colors.grey4 : colors.grey2)};
  }
`;

export default TableRow;
