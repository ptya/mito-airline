import styled from "styled-components";

import { colors, breakPoints } from "components/_styles/variables";

import TableGrid from "./TableGrid";

const TableRow = styled(TableGrid)`
  border-top: 1px solid ${colors.grey3};
  background: ${props => (props.isDisabled ? colors.grey4 : colors.white)};

  .time {
    color: ${colors.grey6};
    font-weight: 300;
    font-size: 12px;
    margin: auto 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      width: 12px;
      margin: 5px 6px;
    }
  }

  .standard {
    background: ${props => (props.isDisabled ? colors.grey4 : colors.grey2)};
  }

  @media (min-width: ${breakPoints[0]}) {
    .time {
      font-size: 15px;
      flex-direction: row;
    }
    img {
      width: 16px;
      margin: auto 6px;
    }
  }
`;

export default TableRow;
