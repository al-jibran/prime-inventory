import React, { useState } from 'react';
import Toolbar from '../components/Toolbar';
import { View, FlatList } from 'react-native';
import ProductItem from '../components/ProductItem';
import Searchbar from '../components/Searchbar';
import AddProduct from '../components/AddProduct';
import Modal from '../components/Modal';
import { useStore } from '../contexts/StoreContext';

const renderItem = (item, products) => <ProductItem item={item} products={products} />;

const Inventory = () => {
    const [visible, setVisible] = useState(false);
    const [products] = useStore();

    return (
        <View>
            <Toolbar visible={visible} toggleModal={setVisible} />
            <FlatList
                ListHeaderComponent={() => <Searchbar placeholder="Search" clearButtonMode='while-editing' />}
                data={products}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => renderItem(item, products)}
            />
            <Modal visible={visible}>
                <AddProduct setVisible={setVisible} />
            </Modal>
        </View>
    );
};

export default Inventory;