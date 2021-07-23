import React, { useState } from "react";
import { View } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../../graphql/queries";
import HistoryItemRender from "./HistoryItemRender";
import SectionListByDate from "../../components/SectionListByDate";
import FetchMoreFooter from "../../components/FetchMoreFooter";
import {
  TransactionHistoryInfo,
  TransactionHistoryReveal,
} from "./TransactionHistory";

const History = () => {
  const tabValues = ["ALL", "BILL"];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, error, fetchMore, refetch, networkStatus } = useQuery(
    GET_TRANSACTIONS,
    {
      variables: {
        first: 7,
      },
      onCompleted: () => {
        setRefreshing(false);
      },
      fetchPolicy: "cache-and-network",
      notifyOnNetworkStatusChange: true,
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
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          refetch({ first: 7 });
        }}
        listEmptyText={"There are currently no transactions to show."}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        renderItem={({ item }) => {
          const time = new Date(item.created).toLocaleTimeString("en-us", {
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
          });
          return (
            <HistoryItemRender
              item={item}
              id={item._id}
              time={time}
              AdditionalInfo={
                item.type === "PRODUCT" && (
                  <TransactionHistoryInfo item={item} />
                )
              }
              RevealInfo={<TransactionHistoryReveal item={item} />}
            />
          );
        }}
        ListFooterComponent={<FetchMoreFooter networkStatus={networkStatus} />}
        ListFooterComponentStyle={{ marginTop: 15 }}
      />
    </View>
  );
};

export default History;
