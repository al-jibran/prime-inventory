import React, { useState } from "react";
import { Formik, useField } from "formik";
import { View, Pressable, StyleSheet, Platform } from "react-native";
import Autocomplete from "react-native-autocomplete-input";

import { NumberInput, DropDownInput } from "../../components/InputField";
import {
  Detail,
  FieldStyle,
  FormActions,
  NumberDropDown,
} from "../../styles/common";
import Button from "../../components/Button";
import { Text, SubText, AdaptiveText, FieldTitle } from "../../components/Text";
import { useDropDown } from "../../hooks/useDropDown";
import { useProducts } from "../../hooks/useProducts";
import Theme from "../../theme";
import { selectedProduct } from "../../../Cache";

const initialValues = {
  stock: "0",
  query: "",
  unit: "pcs",
};

// android will have problems with autocomplete overlapping other elements
const styles =
  Platform.OS === "android" &&
  StyleSheet.create({
    autocompleteContainer: {
      flex: 1,
      left: 0,
      position: "absolute",
      right: 0,
      top: 0,
    },
  });

const renderItem = (item, onPress) => {
  return (
    <Pressable onPress={() => onPress(item)}>
      <Detail style={{ padding: 20 }}>
        <View>
          <Text>{item.name}</Text>
          <SubText color={Theme.color.textSecondary}>{item.brand}</SubText>
        </View>
        <AdaptiveText includeZero>{item.stock}</AdaptiveText>
      </Detail>
    </Pressable>
  );
};

const Form = ({ onSubmit }) => {
  const [disabled, setDisabled] = useState(true);
  const { items, setItems } = useDropDown("units");

  const onReset = () => {
    setDisabled(true);
  };

  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        onReset={onReset}
      >
        {({ handleSubmit, handleReset }) => (
          <View style={{ marginTop: 10 }}>
            <FieldStyle layout="horizontal" style={{ zIndex: 202020 }}>
              <FieldTitle>Quantity</FieldTitle>
              <NumberDropDown>
                <NumberInput name="stock" />
                <DropDownInput
                  name="unit"
                  items={items}
                  setItems={setItems}
                  direction="BOTTOM"
                />
              </NumberDropDown>
            </FieldStyle>
            <FieldStyle style={{ ...styles.autocompleteContainer }}>
              <AutoCompleteField setDisabled={setDisabled} />
            </FieldStyle>
            <FormActions>
              <Button
                bgColor="white"
                text="Clear"
                onPress={handleReset}
                rounded
              />
              <Button
                bgColor="primary"
                disabled={disabled}
                text="Add"
                onPress={(item) => handleSubmit(item, handleReset)}
                rounded
              />
            </FormActions>
          </View>
        )}
      </Formik>
    </View>
  );
};

const AutoCompleteField = ({ setDisabled }) => {
  const [query, , queryHelpers] = useField("query");
  const [hide, setHide] = useState(true);
  const [products, , { refetchWith }] = useProducts(5);

  const hideResults = () => setHide(true);
  const showResults = () => setHide(false);

  const handleOnPress = (item) => {
    queryHelpers.setValue(item.name);
    selectedProduct(item);
    setDisabled(false);
    hideResults();
  };

  return (
    <Autocomplete
      data={products}
      hideResults={hide}
      value={query.value}
      placeholder="Enter product name"
      onTextInput={showResults}
      onSubmitEditing={hideResults}
      name="query"
      flatListProps={{
        keyExtractor: (_, idx) => idx.toString(),
        renderItem: ({ item }) => renderItem(item, handleOnPress),
      }}
      clearButtonMode={"always"}
      onChangeText={(text) => {
        text.length === 0 && hideResults();
        refetchWith(text);
        queryHelpers.setValue(text);
        setDisabled(true);
      }}
    />
  );
};

export default Form;
