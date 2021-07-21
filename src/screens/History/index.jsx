import React, { useState } from "react";
import { View } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../../graphql/queries";
import HistoryItemRender from "./HistoryItemRender";
import SectionListByDate from "../../components/SectionListByDate";
import useRefresh from "../../hooks/useRefresh";

const History = () => {
  const [refresh, setRefresh] = useRefresh();
  const tabValues = ["ALL", "BILL"];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { data, loading, error, fetchMore, refetch } = useQuery(
    GET_TRANSACTIONS,
    {
      variables: {
        first: 7,
      },
      onCompleted: (data) => {
        console.log(data.transactions.totalCount);
        setRefresh(false);
      },
      fetchPolicy: "cache-and-network",
    }
  );

  const history = data ? data.transactions.edges.map((edge) => edge.node) : [];

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
      <SectionListByDate
        data={history}
        loading={loading}
        error={error}
        refreshing={refresh}
        extraData={refresh}
        onRefresh={() => {
          setRefresh(true);
          refetch();
        }}
        listEmptyText={"There are currently no transactions to show."}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
        renderItem={({ item }) => (
          <HistoryItemRender item={item} id={item._id} />
        )}
      />
    </View>
  );
};

export default History;
