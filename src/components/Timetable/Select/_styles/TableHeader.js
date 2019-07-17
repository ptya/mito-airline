import styled from "styled-components";

import { colors, breakPoints } from "components/_styles/variables";

import TableGrid from "./TableGrid";

const TableHeader = styled(TableGrid)`
  color: ${colors.black};
  font-weight: bold;
  font-size: 9px;
  text-transform: uppercase;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;

  @media (min-width: ${breakPoints[0]}) {
    font-size: 10px;
    top: 5px;
  }
`;

export default TableHeader;
