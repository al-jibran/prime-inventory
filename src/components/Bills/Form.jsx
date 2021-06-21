import React, { useState } from 'react';
import { Formik, useField } from 'formik';
import { View, Pressable, StyleSheet, Platform } from 'react-native';

import { NumberInput, DropDownInput } from '../InputField';
import { FieldStyle, FormActions } from '../../styles/common';
import Button from '../Button';
import { Text } from '../Text';
import Autocomplete from 'react-native-autocomplete-input';
import { useStore } from '../../contexts/StoreContext';
import { useDropDown } from '../../hooks/useDropDown';

const initialValues = {
  stock: "0",
  name: '',
  id: '',
  query: '',
  unit: "pcs"
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
      <Text>{item.name}</Text>
    </Pressable>
  );
};

const Form = ({ onSubmit }) => {
  const [disabled, setDisabled] = useState(true);
  const { items, setItems } = useDropDown('units');

  const onReset = () => {
    setDisabled(true);
  };

  return (
    <View>
      <Formik initialValues={initialValues} onSubmit={onSubmit} onReset={onReset}>
        {({ handleSubmit, handleReset }) =>
          <View style={({ marginTop: 10 })}>
            <FieldStyle layout="horizontal" style={({ zIndex: 202020 })}>
              <Text>Quantity</Text>
              <NumberInput name="stock" />
              <DropDownInput
                name="unit"
                items={items}
                setItems={setItems}
                direction="BOTTOM" />
            </FieldStyle>
            <FieldStyle>
              <AutoCompleteField setDisabled={setDisabled} />
            </FieldStyle>
            <FormActions>
              <Button bgColor="white" text="Clear" onPress={handleReset} rounded />
              <Button bgColor="primary" disabled={disabled} text="Add" onPress={(item) => handleSubmit(item, handleReset)} rounded />
            </FormActions>
          </View>
        }
      </Formik>
    </View>
  );
};

const AutoCompleteField = ({ setDisabled }) => {
  const [products,] = useStore();
  const [, , idFieldHelpers] = useField('id');
  const [, , nameFieldHelpers] = useField('name');
  const [query, , queryHelpers] = useField('query');
  const [hide, setHide] = useState(true);

  const filterProducts = () => {
    return products.filter(item => item.name.toLowerCase().includes(query.value.toLowerCase()));
  };

  const hideResults = () => setHide(true);
  const showResults = () => setHide(false);

  const handleOnPress = (item) => {
    queryHelpers.setValue(item.name);
    idFieldHelpers.setValue(item.id);
    nameFieldHelpers.setValue(item.name);
    setDisabled(false);
    hideResults();
  };

  return (
    <FieldStyle style={styles.autocompleteContainer, { zIndex: 999 }}>
      <Autocomplete
        data={filterProducts()}
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
        clearButtonMode={'always'}
        onChangeText={(text) => {
          text.length === 0 && hideResults();
          queryHelpers.setValue(text);
          setDisabled(true);
        }}
      />
    </FieldStyle>
  );
};

export default Form;