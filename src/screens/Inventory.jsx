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
  const [deleteProduct, { error }] = useMutation(DELETE_PRODUCT, {
    update: (cache) => {
      cache.modify({
        fields: {
          inventory(existing, { DELETE }) {
            return DELETE;
          },
        },
      });
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
      {error && <Text>{error.message}</Text>}
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
      <ProductsList />
      <Modal visible={visible}>
        <AddProduct setVisible={setVisiblity} />
      </Modal>
    </Container>
  );
};

const ProductsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [first] = useState(10);
  const [orderDirection] = useState("DESC");
  const [orderBy] = useState("CREATED_AT");

  const { data, loading, error, fetchMore, refetch } = useQuery(GET_INVENTORY, {
    variables: {
      first,
      orderDirection,
      orderBy,
    },
  });

  const debounced = useDebouncedCallback((value) => {
    refetch({ search: value });
  }, 500);

  if (error) {
    return <Text>{error.message}</Text>;
  }

  const products = data?.inventory.edges.map((edge) => edge.node);

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

  return (
    <FlatList
      ListHeaderComponent={
        <Searchbar
          placeholder="Search"
          onChangeText={(query) => {
            debounced(query);
            setSearchQuery(query);
          }}
          value={searchQuery}
          clearButtonMode="while-editing"
        />
      }
      data={products}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <RenderProduct item={item} />}
      refreshing={loading}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      onEndReached={onEndReached}
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
