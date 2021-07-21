import React from "react";
import { useApolloClient } from "@apollo/client";
import { ActivityIndicator } from "react-native";
import Theme from "../theme";
import { Text } from "./Text";
import Button from "./Button";
import { HorizontalAndVerticalCenter } from "../styles/common";

const ListEmptyComponent = ({ loading, error, text }) => {
  const client = useApolloClient();
  let content;

  if (loading) {
    content = <ActivityIndicator size="large" color="#0000ff" />;
  } else if (error) {
    content = (
      <>
        <Text color={Theme.color.danger}>{error.message}</Text>
        <Button
          text="Retry"
          margin={10}
          rounded
          bgColor="primary"
          onPress={() =>
            client
              .reFetchObservableQueries(true)
              .then()
              .catch((err) => console.log(err))
          }
        />
      </>
    );
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
