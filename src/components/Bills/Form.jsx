import React, { useState } from 'react';
import { Formik, useField } from 'formik';
import { View, Pressable, Alert, StyleSheet, Platform } from 'react-native';

import { TextInput, NumberInput } from '../InputField';
import { FieldStyle, FormActions } from '../../styles/common';
import Button from '../Button';
import { Text } from '../Text';
import Autocomplete from 'react-native-autocomplete-input';
import { useStore } from '../../contexts/StoreContext';

const initialValues = {
  comment: "",
  stock: "0",
  product: '',
};

// android will have problems with autocomplete overlapping other elements
const styles = Platform.OS === 'android' && StyleSheet.create({
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  }
});

const renderItem = (item, onPress) => {
  return (
    <Pressable onPress={() => onPress(item)} style={({ padding: 20 })}>
      <Text>{item.product}</Text>
    </Pressable>
  );
};

const Form = ({ onSubmit }) => {
  return (
    <View>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit, handleReset }) =>
          <View style={({ marginTop: 10 })}>
            <FieldStyle>
              <Text>Comment</Text>
              <TextInput name="comment" multiline={true} />
            </FieldStyle>
            <FieldStyle layout="horizontal">
              <Text>Quantity</Text>
              <NumberInput name="stock" />
            </FieldStyle>
            <FieldStyle>
              {/* SearchInput should return a product object */}
              <AutoCompleteField />
            </FieldStyle>
            <FormActions>
              <Button bgColor="white" text={"Clear"} onPress={handleReset} rounded />
              <Button bgColor="success" text={"Save"} onPress={(item) => handleSubmit(item, handleReset)} rounded />
            </FormActions>
          </View>
        }
      </Formik>
    </View>
  );
};

const AutoCompleteField = () => {
  const [products,] = useStore();
  const [field, , fieldHelpers] = useField('product');
  const [hide, setHide] = useState(true);

  const filterProducts = () => {
    return products.filter(item => item.product.toLowerCase().includes(field.value.toLowerCase()));
  };

  const hideResults = () => setHide(true);
  const showResults = () => setHide(false);

  const handleOnPress = (item) => {
    fieldHelpers.setValue(item.product);
    hideResults();
  };

  return (
    <FieldStyle style={styles.autocompleteContainer, { zIndex: 999 }}>
      <Autocomplete
        data={filterProducts()}
        hideResults={hide}
        value={field.value}
        placeholder="Enter product name"
        onTextInput={showResults}
        onSubmitEditing={hideResults}
        name="product"
        flatListProps={{
          keyExtractor: (_, idx) => idx,
          renderItem: ({ item }) => renderItem(item, handleOnPress),
        }}
        onChangeText={(text) => {
          text.length === 0 && hideResults();
          fieldHelpers.setValue(text);
        }}
      />
    </FieldStyle>
  );
};

export default Form;