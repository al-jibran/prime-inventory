import { useQuery } from "@apollo/client";
import { useDebouncedCallback } from "use-debounce/lib";
import { GET_INVENTORY } from "../graphql/queries";
import { useState } from "react";

export const useProducts = (
  first = 8,
  orderBy = "CREATED_AT",
  orderDirection = "DESC"
) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, error, fetchMore, refetch } = useQuery(GET_INVENTORY, {
    variables: {
      first,
      orderDirection,
      orderBy,
    },
    onCompleted: (data) => {
      console.log(data.inventory.totalCount);
      setRefreshing(false);
    },
    onError: (error) => {
      console.log(error);
    },
    fetchPolicy: "cache-and-network",
  });

  const products = data?.inventory.edges.map((edge) => edge.node);

  const debounced = useDebouncedCallback((value) => {
    data && refetch({ search: value });
  }, 500);

  const onEndReached = () => {
    const canFetchMore = !loading && data?.inventory.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.inventory.pageInfo.endCursor,
      },
    });
  };

  return {
    products,
    error,
    loading,
    filter: debounced,
    fetchMore: onEndReached,
    refreshing,
    setRefreshing,
  };
};
