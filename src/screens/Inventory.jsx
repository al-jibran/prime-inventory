import React, { useState } from 'react';
import Toolbar from '../components/Toolbar';
import { FlatList, Text, Pressable, Alert } from 'react-native';
import ProductItem from '../components/ProductItem';
import Searchbar from '../components/Searchbar';
import AddProduct from '../components/AddProduct';
import Modal from '../components/Modal';
import { useStore } from '../contexts/StoreContext';
import { deleteProduct } from '../productReducer';
import styled from 'styled-components';
import Constants from 'expo-constants';


const Container = styled.View`
    margin-top: ${Constants.statusBarHeight + 15}px;
    padding-left: 30px;
    padding-right: 30px;
`;


const renderItem = (item, products, dispatch) => {
  const deleteTitle = `Delete ${item.product}?`;
  const deleteMessage = `The product ${item.product} from ${item.brand} will be deleted permanently.\n\nDo you want to continue?`;
  const buttons = [{ text: "Cancel", onPress: null, style: "cancel" },
  { text: "Yes", onPress: () => dispatch(deleteProduct(item.id)) }];

  return (<Pressable onLongPress={() => Alert.alert(deleteTitle, deleteMessage, buttons)}>
    <ProductItem item={item} products={products} />
  </Pressable>);
};

const Inventory = () => {
  const [visible, setVisiblity] = useState(false);
  const [products, dispatch] = useStore();

  return (
    <Container>
      <Toolbar items={() => <ToolbarItems visible={visible} toggleModal={setVisiblity} />} />
      <FlatList
        ListHeaderComponent={() => <Searchbar placeholder="Search" clearButtonMode='while-editing' />}
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => renderItem(item, products, dispatch)}
      />
      <Modal visible={visible}>
        <AddProduct setVisible={setVisiblity} />
      </Modal>
    </Container>
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