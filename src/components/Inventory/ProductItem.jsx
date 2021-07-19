import React, { useState } from "react";
import { View } from "react-native";
import styled from "styled-components/native";

import Modal from "../Modal";
import EditProduct from "./EditProduct";
import { Text, SubText } from "../Text";
import Theme from "../../theme";
import { ShadowBox } from "../../styles/common";

const ProductItemStyle = styled(ShadowBox)`
  height: 75px;
  margin: 15px auto;
  padding-left: 20px;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
`;

const Stock = styled.Pressable`
  width: 75px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.bgColor || Theme.color.danger};
  align-self: stretch;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const ProductItem = ({ item }) => {
  const [visible, setVisible] = useState(false);

  let color = Theme.color.danger;

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
      <View style={{ flexGrow: 3, flexBasis: "20%" }}>
        <Text>{item.name}</Text>
        <SubText color={Theme.color.textSecondary}>{item.brand}</SubText>
      </View>
      <Stock bgColor={color} onPress={handleStockPress}>
        <Text fontSize="40" color="white">
          {item.stock}
        </Text>
      </Stock>
      <Modal visible={visible}>
        <EditProduct setVisible={setVisible} data={item} />
      </Modal>
    </ProductItemStyle>
  );
};

export default ProductItem;
