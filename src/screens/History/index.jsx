import React, { useState } from "react";
import { FlatList, View } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../../graphql/queries";
import ListEmptyComponent from "../../components/ListEmptyComponent";
import HistoryItemRender from "./HistoryItemRender";

const History = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { data, loading, error } = useQuery(GET_TRANSACTIONS, {
    variables: {
      first: 9,
    },
  });

  const history = data?.transactions.edges.map((edge) => edge.node);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          marginLeft: 20,
          marginRight: 20,
          flexShrink: 1,
          marginTop: 20,
        }}
      >
        <SegmentedControlTab
          values={["All", "Bills"]}
          selectedIndex={selectedIndex}
          onTabPress={(index) => setSelectedIndex(index)}
        />
      </View>
      <FlatList
        data={history}
        renderItem={({ item }) => (
          <HistoryItemRender item={item} id={item._id} />
        )}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={
          <ListEmptyComponent
            loading={loading}
            error={error}
            text={["There are currently no transactions to show."]}
          />
        }
        contentContainerStyle={{
          marginRight: 20,
          marginLeft: 20,
          flexGrow: 1,
        }}
      />
    </View>
  );
};

export default History;
