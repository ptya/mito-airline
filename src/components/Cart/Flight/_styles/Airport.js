import styled from "styled-components";

const Airport = styled.p`
  display: flex;
  flex-direction: column;
  margin: 0;
  margin-left: 10px;
  font-size: 14px;
  font-weight: bold;

  span:first-child:after {
    content: " –";
  }

  span:last-child {
    font-size: 10px;
  }
`;

export default Airport;
