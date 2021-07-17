/* eslint-disable react/display-name */
// Native Imports
import React, { useState, useLayoutEffect } from "react";
import { FlatList, Text, Pressable, Alert } from "react-native";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/core";

// Custom Imports
import ProductItem from "../components/Inventory/ProductItem";
import Searchbar from "../components/Searchbar";
import AddProduct from "../components/Inventory/AddProduct";
import Modal from "../components/Modal";
import { useProducts } from "../hooks/useProducts";
import { DELETE_PRODUCT } from "../graphql/queries";

//Styles
import { Container } from "../styles/common";

const RenderProduct = ({ item }) => {
  const navigation = useNavigation();

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
      onPress={() => navigation.navigate("Product", { id: item._id })}
      onLongPress={() => Alert.alert(deleteTitle, deleteMessage, buttons)}
    >
      <ProductItem item={item} />
      {error !== "" && <Text>{error}</Text>}
    </Pressable>
  );
};

const Inventory = ({ navigation }) => {
  const [visible, setVisiblity] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AddProductButton visible={visible} toggleModal={setVisiblity} />
      ),
      headerLeft: () => <FilterProductsButton />,
      headerRightContainerStyle: { paddingRight: 25 },
      headerLeftContainerStyle: { paddingLeft: 25 },
    });
  }, [navigation]);

  return (
    <Container padLeft={20} padRight={20}>
      <ProductListContainer navigation={navigation} />
      <Modal visible={visible}>
        <AddProduct setVisible={setVisiblity} />
      </Modal>
    </Container>
  );
};

const ProductListContainer = () => {
  const { products, loading, error, fetchMore, filter } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [refereshing, setRefreshing] = useState(false);

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
      refreshing={refereshing}
      onRefresh={() => {
        setRefreshing(true);
        setSearchQuery("");
        filter("");
        setRefreshing(false);
      }}
      ListEmptyComponent={() => {
        if (loading) {
          return <Text>Loading...</Text>;
        }
        return (
          <Text>
            There doesn&apos;t seem to be anything here. Start by clicking the
            add button
          </Text>
        );
      }}
    />
  );
};

const AddProductButton = ({ visible, toggleModal }) => {
  const onPressAdd = () => {
    toggleModal(!visible);
  };

  return (
    <Pressable onPress={onPressAdd}>
      <Text>Add</Text>
    </Pressable>
  );
};

const FilterProductsButton = () => {
  return (
    <Pressable onPress={null}>
      <Text>Filter</Text>
    </Pressable>
  );
};

export default Inventory;
