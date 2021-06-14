import React from 'react';
import Toolbar from '../components/Toolbar';
import { View, FlatList, Text } from 'react-native';
import styled from 'styled-components';
import ProductItem from '../components/ProductItem';

const SearchStyle = styled.TextInput`
    margin-top: 30px;
    margin-bottom: 10px;
    border: 1px solid black;
    width: 100%;
    border-radius: 30px;
    padding: 5px;
`;

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
    stock: 10,
}];

const renderItem = ({ item }) => <ProductItem item={item} />;

const Inventory = () => {
    return (
        <View>
            <Toolbar />
            <FlatList
                ListHeaderComponent={() => <SearchStyle placeholder="Search" clearButtonMode='while-editing' />}
                data={products}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem} />
        </View>
    );
};

export default Inventory;