import React, { useState } from 'react';
import Toolbar from '../components/Toolbar';
import { View, FlatList, Modal, Alert } from 'react-native';
import ProductItem from '../components/ProductItem';
import Searchbar from '../components/Searchbar';
import AddProduct from '../components/AddProduct';

const products = [{
    id: 1,
    product: 'Product 1',
    brand: 'Brand A',
    stock: 5,
}, {
    id: 2,
    product: 'Product 2',
    brand: 'Brand B',
    stock: 1,
}, {
    id: 3,
    product: 'Product 3',
    brand: 'Brand C',
    stock: 13,
}, {
    id: 4,
    product: 'Product 4',
    brand: 'Brand A',
    stock: 2,
}, {
    id: 5,
    product: 'Product 5',
    brand: 'Brand B',
    stock: 10,
}];

const renderItem = ({ item }) => <ProductItem item={item} />;

const Inventory = () => {
    const [visible, setVisible] = useState(false);

    return (
        <View>
            <Toolbar visible={visible} toggleModal={setVisible}/>
            <FlatList
                ListHeaderComponent={() => <Searchbar placeholder="Search" clearButtonMode='while-editing' />}
                data={products}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem} />
            <Modal animated animationType={"fade"} transparent={true} visible={false}>
                <AddProduct />
            </Modal>
        </View>
    );
};

export default Inventory;