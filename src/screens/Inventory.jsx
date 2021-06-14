import React from 'react';
import Toolbar from '../components/Toolbar';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import styled from 'styled-components';

const SearchStyle = styled.TextInput`
    margin: 20px auto;
    border: 1px solid black;
    width: 100%;
    border-radius: 30px;
    padding: 5px;
`;

const ProductItem = styled.View`
    width: 99%;
    margin: 20px auto;
    padding-left: 10px;
    shadow-color: #ddd;
    shadow-offset: 1px 1px;
    shadow-opacity: 1;
    shadow-radius: 3px;
    elevation: 5;
    background-color: #fff;
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

const renderItem = ({ item }) => {
    return (
        <ProductItem>
            <Text>{item.product}</Text>
            <Text>{item.brand}</Text>
            <Text>{item.stock}</Text>
        </ProductItem>
    );
};

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