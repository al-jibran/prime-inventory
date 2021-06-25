// Native Imports
import React, { useState } from "react";
import { FlatList, Text, Pressable, Alert } from "react-native";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { DELETE_PRODUCT, GET_INVENTORY } from "../graphql/queries";

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
    update: (cache, { data }) => {
      try {
        cache.modify({
          fields: {
            getInventory(list, { readField }) {
              return list.filter(
                (pro) => readField("id", pro) !== data.deleteProduct.id
              );
            },
          },
        });
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  // Opens a delete alert with Alert.alert() and displays a title, message and buttons for the action.
  const deleteTitle = `Delete ${item.name}?`;
  const deleteMessage = `The product ${item.name} from ${item.brand} will be deleted permanently.\n\nDo you want to continue?`;
  const buttons = [
    { text: "Cancel", onPress: null, style: "cancel" },
    {
      text: "Yes",
      onPress: () => deleteProduct({ variables: { id: item.id } }),
    },
  ];
  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <Pressable
      onLongPress={() => Alert.alert(deleteTitle, deleteMessage, buttons)}
    >
      <ProductItem item={item} />
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
  const { data, loading, error, fetchMore } = useQuery(GET_INVENTORY, {
    variables: {
      first: 10,
    },
  });

  if (loading) {
    return <Text>Loading</Text>;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  const products = data.getInventory.edges.map((edge) => edge.node);

  // Filters the products based on search query. "" search query displays all products.
  // Update when pagination takes place to search from the database rather than local state.
  const filterProducts = () =>
    products.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  /* Searchbar component has to be directly in ListHeaderComponent. Otherwise, the Searchbar loses focus. */

  const onEndReached = () => {
    const canFetchMore = !loading && data?.getInventory.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.getInventory.pageInfo.endCursor,
      },
    });
  };
  return (
    <FlatList
      ListHeaderComponent={
        <Searchbar
          placeholder="Search"
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
          clearButtonMode="while-editing"
        />
      }
      data={filterProducts()}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <RenderProduct item={item} />}
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
