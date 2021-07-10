// Native Imports
import React, { useState } from "react";
import { FlatList, Text, Pressable, Alert } from "react-native";
import { useQuery, useMutation } from "@apollo/client";
import { DELETE_PRODUCT, GET_INVENTORY } from "../graphql/queries";
import { useDebouncedCallback } from "use-debounce";

// Custom Imports
import ProductItem from "../components/Inventory/ProductItem";
import Searchbar from "../components/Searchbar";
import AddProduct from "../components/Inventory/AddProduct";
import Modal from "../components/Modal";
import Toolbar from "../components/Toolbar";

//Styles
import { Container } from "../styles/common";

const RenderProduct = ({ item }) => {
  const [error, setError] = useState("");
  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    update: (cache) => {
      cache.modify({
        fields: {
          inventory(existing, { DELETE }) {
            return DELETE;
          },
        },
      });
    },
    onError: (error) => {
      setError(error.message);
      setTimeout(() => setError(""), 1000);
    },
  });

  // Opens a delete alert with Alert.alert() and displays a title, message and buttons for the action.
  const deleteTitle = `Delete ${item.name}?`;
  const deleteMessage = `The "${item.name}" from "${item.brand}" will be deleted permanently.\n\nDo you want to continue?`;
  const buttons = [
    { text: "Cancel", onPress: null, style: "cancel" },
    {
      text: "Yes",
      onPress: () => deleteProduct({ variables: { id: item._id } }),
    },
  ];

  return (
    <Pressable
      onLongPress={() => Alert.alert(deleteTitle, deleteMessage, buttons)}
    >
      <ProductItem item={item} />
      {error !== "" && <Text>{error}</Text>}
    </Pressable>
  );
};

const Inventory = () => {
  const [visible, setVisiblity] = useState(false);

  return (
    <Container padLeft={20} padRight={20}>
      <Toolbar
        items={() => (
          <ToolbarItems visible={visible} toggleModal={setVisiblity} />
        )}
      />
      <ProductListContainer />
      <Modal visible={visible}>
        <AddProduct setVisible={setVisiblity} />
      </Modal>
    </Container>
  );
};

const useProducts = (
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

const ProductListContainer = () => {
  const { products, loading, error, fetchMore, filter } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <FlatList
      ListHeaderComponent={
        <Searchbar
          placeholder="Search"
          onChangeText={(query) => {
            filter(query);
            setSearchQuery(query);
          }}
          value={searchQuery}
          clearButtonMode="while-editing"
        />
      }
      data={products}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <RenderProduct item={item} />}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.1}
    />
  );
};

const ToolbarItems = ({ visible, toggleModal }) => {
  const onPressAdd = () => {
    toggleModal(!visible);
  };

  return (
    <>
      <Text>Filter</Text>
      <Text>Inventory</Text>
      <Pressable onPress={onPressAdd}>
        <Text>Add</Text>
      </Pressable>
    </>
  );
};

export default Inventory;
