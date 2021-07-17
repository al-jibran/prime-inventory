import { useQuery, useLazyQuery } from "@apollo/client";
import { useDebouncedCallback } from "use-debounce/lib";
import { GET_INVENTORY } from "../graphql/queries";

export const useProducts = (
  first = 10,
  orderBy = "CREATED_AT",
  orderDirection = "DESC"
) => {
  const [getProducts, { data, loading, error, fetchMore, refetch }] =
    useLazyQuery(GET_INVENTORY, {
      variables: {
        first,
        orderDirection,
        orderBy,
      },
      onCompleted: (data) => {
        console.log(data.inventory.totalCount);
      },
      onError: (error) => {
        console.log(error);
      },
    });

  const products = data?.inventory.edges.map((edge) => edge.node);

  const debounced = useDebouncedCallback((value) => {
    refetch({ search: value });
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
    getProducts,
    products,
    error,
    loading,
    filter: debounced,
    fetchMore: onEndReached,
  };
};
