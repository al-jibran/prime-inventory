import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { Text, SubText } from "../Text";
import Theme from "../../theme";
import { ShadowBox } from "../../styles/common";
import { useNavigation } from "@react-navigation/native";

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
  const navigation = useNavigation();

  let color = Theme.color.danger;

  if (item.stock >= 5 && item.stock < 10) {
    color = Theme.color.warning;
  } else if (item.stock >= 10) {
    color = Theme.color.success;
  }

  const handleStockPress = () => {
    navigation.navigate("EditProduct", { id: item._id });
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
    </ProductItemStyle>
  );
};

export default ProductItem;
