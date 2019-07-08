import styled from "styled-components";

import { colors } from "components/_styles/variables";

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
  transition: background 0.1s ease;

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

  :active {
    transform: translate3d(1px, 1px, 0);
  }
`;

export default TableButton;
