import React from 'react';
import Toolbar from '../components/Toolbar';
import { View, FlatList, Text } from 'react-native';
import styled from 'styled-components';

const SearchStyle = styled.TextInput`
    margin-top: 30px;
    margin-bottom: 10px;
    border: 1px solid black;
    width: 100%;
    border-radius: 30px;
    padding: 5px;
`;

const ProductItem = styled.View`
    width: 99%;
    height: 75px;
    margin: 20px auto;
    padding-left: 20px;
    shadow-color: #ddd;
    shadow-offset: 1px 1px;
    shadow-opacity: 1;
    shadow-radius: 3px;
    elevation: 5;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
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
            <View style={{flexGrow: 3 }}>
                <Text>{item.product}</Text>
                <Text>{item.brand}</Text>
            </View>
            <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fbca1d', alignSelf: 'stretch', }}>
                <Text>{item.stock}</Text>
            </View>
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