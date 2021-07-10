import React from "react";
import styled from "styled-components/native";

const ToolbarStyle = styled.View`
  flex-direction: row;
  justify-content: ${(props) => props.justifyItems || "space-between"};
  flex-shrink: 1;
  padding: 0 10px 10px 10px;
`;

const Toolbar = ({ items, justifyItems }) => {
  return <ToolbarStyle justifyItems={justifyItems}>{items()}</ToolbarStyle>;
};

export default Toolbar;
