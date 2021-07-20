import React from "react";
import { ActivityIndicator } from "react-native";
import Theme from "../theme";
import { Text } from "./Text";
import { HorizontalAndVerticalCenter } from "../styles/common";

const ListEmptyComponent = ({ loading, error, text }) => {
  let content;

  if (loading) {
    content = <ActivityIndicator size="large" />;
  } else if (error) {
    content = <Text color={Theme.color.danger}>{error.message}</Text>;
  } else {
    content = text.map((line, i) => (
      <Text key={i} color="#aaa">
        {line}
      </Text>
    ));
  }

  return <HorizontalAndVerticalCenter>{content}</HorizontalAndVerticalCenter>;
};

export default ListEmptyComponent;
