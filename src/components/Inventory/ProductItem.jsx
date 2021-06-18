import React, { useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

import Modal from '../Modal';
import EditProduct from './EditProduct';
import { Text, SubText } from '../Text';
import Theme from '../../theme';

const ProductItemStyle = styled.View`
    width: 99%;
    height: 75px;
    margin: 15px auto;
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

const Stock = styled.Pressable`
    width: 75px;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.bgColor || Theme.color.primary};
    align-self: stretch;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
`;

const ProductItem = ({ item, products }) => {
    const [visible, setVisible] = useState(false);

    let color = Theme.color.primary;

    if (item.stock >= 5 && item.stock < 10) {
        color = Theme.color.warning;
    } else if (item.stock >= 10) {
        color = Theme.color.success;
    }

    const handleStockPress = () => {
        setVisible(true);
    };

    return (
        <ProductItemStyle>
            <View style={{ flexGrow: 3, flexBasis: '20%' }}>
                <Text>{item.product}</Text>
                <SubText color={Theme.color.textSecondary}>{item.brand}</SubText>
            </View>
            <Stock bgColor={color} onPress={handleStockPress}>
                <Text fontSize="40" color="white">{item.stock}</Text>
            </Stock>
            <Modal visible={visible}>
                <EditProduct setVisible={setVisible} refreshData={null} data={item} products={products} />
            </Modal>
        </ProductItemStyle>
    );
};

export default ProductItem;