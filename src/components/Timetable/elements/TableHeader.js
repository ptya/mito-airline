import styled from "styled-components";

import { colors } from "../../styles/variables";

import TableGrid from "./TableGrid";

const TableHeader = styled(TableGrid)`
  color: ${colors.black};
  font-weight: bold;
  font-size: 10px;
  text-transform: uppercase;
  position: absolute;
  left: 0;
  right: 0;
  top: 5px;
`;

export default TableHeader;
