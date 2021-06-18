import React, { useState } from 'react';
import { Formik } from 'formik';
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
  product: null,
};


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
  const [products,] = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [hide, setHide] = useState(true);

  const filterProducts = () =>
    products.filter(item => item.product.toLowerCase().includes(searchQuery.toLowerCase()));

  const hideResults = () => setHide(true);
  const showResults = () => setHide(false);

  const handleOnPress = (item) => {
    Alert.alert(item.product);

    hideResults();

  };

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
              <FieldStyle style={styles.autocompleteContainer, { zIndex: 1343 }}>
                <Autocomplete
                  data={filterProducts()}
                  hideResults={hide}
                  value={searchQuery}
                  onChangeText={(text) => {
                    text.length === 0 && hideResults();
                    setSearchQuery(text);
                  }}
                  onTextInput={showResults}
                  onSubmitEditing={hideResults}
                  name="product"
                  flatListProps={{
                    keyExtractor: (_, idx) => idx,
                    renderItem: ({ item }) => renderItem(item, handleOnPress),
                  }}
                />
              </FieldStyle>
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

export default Form;