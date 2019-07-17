import styled from "styled-components";

import { colors, breakPoints } from "components/_styles/variables";

const TableButton = styled.button`
  margin: 10px 5px;
  padding: 0;
  width: 100%;
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
  font-size: 16px;
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

  @media (min-width: ${breakPoints[0]}) {
    width: 160px;
    margin: 20px auto;
    font-size: 20px;
  }
`;

export default TableButton;
