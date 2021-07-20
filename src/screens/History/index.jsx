import React, { useState } from "react";
import { FlatList, View } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../../graphql/queries";
import { Container } from "../../styles/common";
import { Text } from "../../components/Text";

const History = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { data, loading, error } = useQuery(GET_TRANSACTIONS, {
    variables: {
      first: 9,
    },
    onCompleted: (data) => {},
  });

  if (loading) {
    return <Text>Loading</Text>;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  const history = data?.transactions.edges.map((edge) => edge.node);

  return (
    <View style={{ flex: 1 }}>
      <View>
        <SegmentedControlTab
          values={["All", "Bills"]}
          selectedIndex={selectedIndex}
          onTabPress={(index) => setSelectedIndex(index)}
        />
      </View>
      <FlatList
        data={history}
        renderItem={({ item }) => <Text>{item.comment}</Text>}
        keyExtractor={(item) => item._id}
        style={{ marginTop: 20 }}
        contentContainerStyle={{
          marginRight: 25,
          marginLeft: 25,
        }}
      />
    </View>
  );
};

export default History;
