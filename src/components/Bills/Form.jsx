import React, { useState } from 'react';
import { Formik, useField } from 'formik';
import { View, Pressable, StyleSheet, Platform } from 'react-native';

import { TextInput, NumberInput } from '../InputField';
import { FieldStyle, FormActions } from '../../styles/common';
import Button from '../Button';
import { Text } from '../Text';
import Autocomplete from 'react-native-autocomplete-input';
import { useStore } from '../../contexts/StoreContext';

const initialValues = {
  stock: "0",
  name: '',
  id: ''
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
              <AutoCompleteField setDisabled={setDisabled}/>
            </FieldStyle>
            <FormActions>
              <Button bgColor="white" text="Clear" onPress={handleReset} rounded />
              <Button bgColor="success" disabled={disabled} text="Save" onPress={(item) => handleSubmit(item, handleReset)} rounded />
            </FormActions>
          </View>
        }
      </Formik>
    </View>
  );
};

const AutoCompleteField = ({setDisabled}) => {
  const [products,] = useStore();
  const [, , idFieldHelpers] = useField('id');
  const [, , nameFieldHelpers] = useField('name');
  const [query, setQuery] = useState('');
  const [hide, setHide] = useState(true);

  const filterProducts = () => {
    return products.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
  };

  const hideResults = () => setHide(true);
  const showResults = () => setHide(false);

  const handleOnPress = (item) => {
    setQuery(item.name);
    idFieldHelpers.setValue(item.id);
    nameFieldHelpers.setValue(item.name);
    setDisabled(false);
    console.log("added here", item);
    hideResults();
  };

  return (
    <FieldStyle style={styles.autocompleteContainer, { zIndex: 999 }}>
      <Autocomplete
        data={filterProducts()}
        hideResults={hide}
        value={query}
        placeholder="Enter product name"
        onTextInput={showResults}
        onSubmitEditing={hideResults}
        name="name"
        flatListProps={{
          keyExtractor: (_, idx) => idx.toString(),
          renderItem: ({ item }) => renderItem(item, handleOnPress),
        }}
        onChangeText={(text) => {
          text.length === 0 && hideResults();
          setQuery(text);
          setDisabled(true);
        }}
      />
    </FieldStyle>
  );
};

export default Form;