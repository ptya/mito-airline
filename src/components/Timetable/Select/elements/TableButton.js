import styled from "styled-components";

import { colors } from "components/styles/variables";

const TableButton = styled.button`
  margin: 20px auto;
  padding: 0;
  width: 160px;
  height: 48px;
  background: ${props =>
    props.disabled
      ? colors.grey4
      : props.isActive
      ? colors.pink
      : colors.white};
  border: 2px solid ${props => (props.disabled ? colors.grey5 : colors.pink)};
  border-radius: 2px;
  font-weight: bold;
  font-size: 20px;
  color: ${props =>
    props.disabled
      ? colors.grey5
      : props.isActive
      ? colors.white
      : colors.black};
  cursor: ${props => (props.disabled ? "default" : "pointer")};

  &:hover,
  &:active,
  &:focus {
    background: ${props =>
      props.disabled
        ? colors.grey4
        : props.isActive
        ? colors.pink
        : colors.pinkOpacity};
  }
`;

export default TableButton;
