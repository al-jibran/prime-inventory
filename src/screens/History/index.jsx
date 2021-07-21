import React, { useState } from "react";
import { FlatList, View } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../../graphql/queries";
import ListEmptyComponent from "../../components/ListEmptyComponent";
import HistoryItemRender from "./HistoryItemRender";

const History = () => {
  const tabValues = ["ALL", "BILL"];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { data, loading, error, fetchMore, refetch } = useQuery(
    GET_TRANSACTIONS,
    {
      variables: {
        first: 9,
      },
      onCompleted: (data) => {
        console.log(data.transactions.totalCount);
      },
      fetchPolicy: "cache-and-network",
    }
  );

  const history = data?.transactions.edges.map((edge) => edge.node);

  const onEndReached = () => {
    const canFetchMore = !loading && data?.transactions.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.transactions.pageInfo.endCursor,
      },
    });
  };

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
          values={tabValues}
          selectedIndex={selectedIndex}
          onTabPress={(index) => {
            refetch({ filterBy: tabValues[index] });
            setSelectedIndex(index);
          }}
        />
      </View>
      <FlatList
        data={history}
        keyExtractor={(item) => item._id}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
        renderItem={({ item }) => (
          <HistoryItemRender item={item} id={item._id} />
        )}
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
