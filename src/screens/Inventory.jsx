import React, { useState } from 'react';
import Toolbar from '../components/Toolbar';
import { View, FlatList, Text, Pressable } from 'react-native';
import ProductItem from '../components/ProductItem';
import Searchbar from '../components/Searchbar';
import AddProduct from '../components/AddProduct';
import Modal from '../components/Modal';
import { useStore } from '../contexts/StoreContext';

const renderItem = (item, products) => <ProductItem item={item} products={products} />;

const Inventory = () => {
    const [visible, setVisiblity] = useState(false);
    const [products] = useStore();

    return (
        <View>
            <Toolbar items={() => <ToolbarItems visible={visible} toggleModal={setVisiblity} />} />
            <FlatList
                ListHeaderComponent={() => <Searchbar placeholder="Search" clearButtonMode='while-editing' />}
                data={products}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => renderItem(item, products)}
            />
            <Modal visible={visible}>
                <AddProduct setVisible={setVisiblity} />
            </Modal>
        </View>
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