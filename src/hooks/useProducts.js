import { useQuery } from "@apollo/client";
import { useDebouncedCallback } from "use-debounce/lib";
import { GET_INVENTORY } from "../graphql/queries";

export const useProducts = (
  first = 10,
  orderBy = "CREATED_AT",
  orderDirection = "DESC"
) => {
  const { data, loading, error, fetchMore, refetch } = useQuery(GET_INVENTORY, {
    variables: {
      first,
      orderDirection,
      orderBy,
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
    products,
    error,
    loading,
    filter: debounced,
    fetchMore: onEndReached,
  };
};
