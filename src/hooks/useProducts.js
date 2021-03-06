import { useQuery, useReactiveVar } from '@apollo/client';
import { useDebouncedCallback } from 'use-debounce/lib';
import { GET_INVENTORY } from '../graphql/queries';
import { useState } from 'react';
import { productsOrder } from '../../Cache';

export const useProducts = (first = 8) => {
	const [refreshing, setRefreshing] = useState(false);
	const { orderDirection, orderBy } = useReactiveVar(productsOrder);
	const { data, loading, error, fetchMore, refetch, networkStatus } = useQuery(GET_INVENTORY, {
		variables: {
			first,
			orderDirection,
			orderBy,
		},
		onCompleted: () => {
			setRefreshing(false);
		},
		onError: (error) => {
			console.log('Here the error: ', error.stack);
		},
		fetchPolicy: 'cache-and-network',
		notifyOnNetworkStatusChange: true,
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

	return [
		products,
		{ error, loading, networkStatus, refreshing },
		{
			refetchWith: debounced,
			fetchMore: onEndReached,
			setRefreshing,
			refetch,
		},
	];
};
