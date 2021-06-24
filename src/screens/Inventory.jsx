// Native Imports
import React, { useState } from "react";
import { FlatList, Text, Pressable, Alert } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_INVENTORY } from "../graphql/queries";

// Custom Imports
import ProductItem from "../components/Inventory/ProductItem";
import Searchbar from "../components/Searchbar";
import AddProduct from "../components/Inventory/AddProduct";
import Modal from "../components/Modal";
import { deleteProduct } from "../productReducer";
import Toolbar from "../components/Toolbar";

//Styles
import { Container } from "../styles/common";

const renderItem = (item, products, dispatch) => {
  // Opens a delete alert with Alert.alert() and displays a title, message and buttons for the action.
  const deleteTitle = `Delete ${item.name}?`;
  const deleteMessage = `The product ${item.name} from ${item.brand} will be deleted permanently.\n\nDo you want to continue?`;
  const buttons = [
    { text: "Cancel", onPress: null, style: "cancel" },
    { text: "Yes", onPress: () => dispatch(deleteProduct(item.id)) },
  ];

  return (
    <Pressable
      onLongPress={() => Alert.alert(deleteTitle, deleteMessage, buttons)}
    >
      <ProductItem item={item} products={products} />
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
  const { data, loading, error } = useQuery(GET_INVENTORY, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return <Text>Loading</Text>;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  const products = data.getInventory;

  // Filters the products based on search query. "" search query displays all products.
  const filterProducts = () =>
    products.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  {
    /* Searchbar component has to be directly in ListHeaderComponent. Otherwise, the Searchbar loses focus. */
  }
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
      renderItem={({ item }) => renderItem(item, products, null)}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
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
