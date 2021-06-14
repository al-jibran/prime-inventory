import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

const ProductItemStyle = styled.View`
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
    flex-direction: row;
    align-items: center;
    border-radius: 10px;
`;

const ProductItem = ({ item }) => {
    return (
        <ProductItemStyle>
            <View style={{flexGrow: 3, flexBasis: '20%'}}>
                <Text>{item.product}</Text>
                <Text>{item.brand}</Text>
            </View>
            <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fbca1d', alignSelf: 'stretch', borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
                <Text>{item.stock}</Text>
            </View>
        </ProductItemStyle>
    );
};

export default ProductItem;