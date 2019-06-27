import styled from "styled-components";

const GridItem = styled.div.attrs(props => ({
  size:
    (props.area === "header" && "38px 0 38px 20px") ||
    (props.area === "cart" && "0") ||
    (props.area === "outbound" && "0 20px 20px 20px") ||
    (props.area === "inbound" && "20px")
}))`
  grid-area: ${props => props.area};
  margin: ${props => props.size};
`;

export default GridItem;
