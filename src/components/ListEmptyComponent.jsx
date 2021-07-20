import React from "react";
import styled from "styled-components/native";
import { Text } from "./Text";

const HorizontalAndVerticalCenter = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListEmptyComponent = ({ loading, error, text }) => {
  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <HorizontalAndVerticalCenter>
      {text.map((line, i) => (
        <Text key={i} color="#aaa">
          {line}
        </Text>
      ))}
    </HorizontalAndVerticalCenter>
  );
};

export default ListEmptyComponent;
