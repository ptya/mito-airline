import styled from "styled-components";

const TableGrid = styled.div`
  display: grid;
  grid-template-columns: 0.7fr 1fr 1fr 1fr;
  grid-template-areas: "time basic standard plus";
  /* justify-items: center; */

  & > * {
    display: flex;
    justify-content: center;
  }

  .time {
    grid-area: time;
  }

  .basic {
    grid-area: basic;
  }

  .standard {
    grid-area: standard;
  }

  .plus {
    grid-area: plus;
  }
`;

export default TableGrid;
