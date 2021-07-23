/* eslint-disable react/display-name */
// Native Imports
import React, { useState, useLayoutEffect } from "react";
import { FlatList, Pressable, Alert } from "react-native";
import { useMutation, NetworkStatus, makeVar } from "@apollo/client";
import { useNavigation } from "@react-navigation/core";
import { maxBy } from "lodash";

// Custom Imports
import ProductItem from "../components/Inventory/ProductItem";
import Searchbar from "../components/Searchbar";
import { useProducts } from "../hooks/useProducts";
import { DELETE_PRODUCT } from "../graphql/queries";
import ListEmptyComponent from "../components/ListEmptyComponent";
import { HorizontalAndVerticalCenter } from "../styles/common";
import { Text } from "../components/Text";
import Button from "../components/Button";

import Theme from "../theme";
import FetchMoreFooter from "../components/FetchMoreFooter";

const RenderProduct = ({ item, largestValue }) => {
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
      <ProductItem item={item} largestValue={largestValue} />
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
      headerRightContainerStyle: { paddingRight: 20 },
      headerLeftContainerStyle: { paddingLeft: 20 },
    });
  }, [navigation]);

  return <ProductListContainer navigation={navigation} />;
};

const ProductListContainer = () => {
  const [products, info, execute] = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const largestValue = maxBy(products, (obj) => obj.stock)?.stock;

  if (info.networkStatus === NetworkStatus.refetch) {
    return (
      <HorizontalAndVerticalCenter>
        <Text>Refetching...</Text>
      </HorizontalAndVerticalCenter>
    );
  }

  if (info.error) {
    return (
      <HorizontalAndVerticalCenter>
        <Text color={Theme.color.danger}>Error: {info.error.message}</Text>
        <Button
          text="Retry"
          margin={10}
          rounded
          bgColor="primary"
          onPress={() => execute.refetch()}
        />
      </HorizontalAndVerticalCenter>
    );
  }

  return (
    <FlatList
      ListHeaderComponent={
        <Searchbar
          placeholder="Search"
          onChangeText={(query) => {
            execute.refetchWith(query);
            setSearchQuery(query);
          }}
          value={searchQuery}
          clearButtonMode="while-editing"
        />
      }
      data={products}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <RenderProduct item={item} largestValue={largestValue} />
      )}
      contentContainerStyle={{ marginLeft: 20, marginRight: 20, flexGrow: 1 }}
      onEndReached={execute.fetchMore}
      onEndReachedThreshold={0.1}
      refreshing={info.refreshing}
      onRefresh={() => {
        execute.setRefreshing(true);
        setSearchQuery("");
        execute.refetchWith("");
      }}
      ListEmptyComponent={
        <ListEmptyComponent
          loading={info.loading}
          text={[
            "There are no products to show here.",
            "Start by clicking the add button",
          ]}
        />
      }
      ListFooterComponent={
        <FetchMoreFooter networkStatus={info.networkStatus} />
      }
      ListFooterComponentStyle={{ marginTop: 15 }}
    />
  );
};

const AddProductButton = () => {
  const navigation = useNavigation();

  const onPressAdd = () => {
    navigation.navigate("DisplayModal", { screen: "AddProduct" });
  };

  return (
    <Pressable onPress={onPressAdd}>
      <Text>Add</Text>
    </Pressable>
  );
};

const FilterProductsButton = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("DisplayModal", { screen: "FilterProducts" });
      }}
    >
      <Text>Filter</Text>
    </Pressable>
  );
};

export default Inventory;
