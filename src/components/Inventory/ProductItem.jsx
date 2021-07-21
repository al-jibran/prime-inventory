import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { Text, SubText } from "../Text";
import Theme from "../../theme";
import { ShadowBox, AlignBySide } from "../../styles/common";
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
  ${AlignBySide}
  background-color: ${(props) => props.bgColor || Theme.color.danger};
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;

  flex-grow: ${(props) => props.adjust};
  flex-basis: 0px;
`;

const ProductItem = ({ item, largestValue }) => {
  const navigation = useNavigation();

  let color = Theme.color.danger;
  let adjust = 1.4;

  if (item.stock >= 10 && item.stock < 20) {
    color = Theme.color.warning;
  } else if (item.stock >= 20) {
    color = Theme.color.success;
  }

  if (("" + largestValue).length > 3) {
    adjust = 1.7;
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
      <Stock bgColor={color} adjust={adjust} onPress={handleStockPress}>
        <Text fontWeight={Theme.fontWeight.light} fontSize="40" color="white">
          {item.stock}
        </Text>
      </Stock>
    </ProductItemStyle>
  );
};

export default ProductItem;
