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
    const [refreshData, setRefreshData] = useState(false);
    const [products] = useStore();

    console.log(products);

    return (
        <View>
            <Toolbar visible={visible} toggleModal={setVisible} />
            <FlatList
                ListHeaderComponent={() => <Searchbar placeholder="Search" clearButtonMode='while-editing' />}
                data={products}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => renderItem(item, products)}
                extraData={refreshData}
            />
            <Modal visible={visible}>
                <AddProduct setVisible={setVisible} refreshData={setRefreshData} data={products} />
            </Modal>
        </View>
    );
};

export default Inventory;