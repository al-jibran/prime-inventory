import React from "react";
import styled from "styled-components/native";
import { Text } from "./Text";

const HorizontalAndVerticalCenter = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListEmptyComponent = ({ text }) => {
  return (
    <HorizontalAndVerticalCenter>
      {text.map((line, i) => (
        <Text key={i} color="gray">
          {line}
        </Text>
      ))}
    </HorizontalAndVerticalCenter>
  );
};

export default ListEmptyComponent;
