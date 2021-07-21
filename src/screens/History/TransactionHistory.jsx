import React from "react";
import styled from "styled-components";
import { FlatList } from "react-native";
import { Text, SubHeading, AdaptiveText, SubText } from "../../components/Text";

import Theme from "../../theme";
import { ShadowBox, Detail } from "../../styles/common";
import TransactionComment from "./TransactionComment";

const TransactionProducts = styled(ShadowBox)`
  padding: 8px 15px;
  flex: 1;
`;

export const TransactionHistoryInfo = ({ item }) => {
  if (item.type === "PRODUCT") {
    const changes = item.changes[0];
    return (
      <>
        <Detail>
          <SubHeading fontSize={Theme.fontSize.body}>Product Name</SubHeading>
          <Text>{changes.name}</Text>
        </Detail>
        <Detail>
          <SubHeading fontSize={Theme.fontSize.body}>Change</SubHeading>
          <AdaptiveText fontWeight={Theme.fontWeight.light}>
            {changes.change > 0 && "+"}
            {changes.change}
          </AdaptiveText>
        </Detail>
      </>
    );
  }
  return null;
};

export const TransactionHistoryReveal = ({ item }) => {
  if (item.type === "PRODUCT") {
    return <TransactionComment item={item} />;
  }

  return (
    <>
      <TransactionComment item={item} />
      <FlatList
        ListHeaderComponent={
          <TransactionProducts>
            <Detail>
              <SubText fontWeight={Theme.fontWeight.bold}>
                Products Changed
              </SubText>
            </Detail>
          </TransactionProducts>
        }
        style={{ margin: 0 }}
        data={item.changes}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <TransactionProducts>
            <Detail>
              <Text fontWeight={Theme.fontWeight.light}>{item.name}</Text>
              <AdaptiveText fontWeight={Theme.fontWeight.light}>
                {item.change > 0 && "+"}
                {item.change}
              </AdaptiveText>
            </Detail>
          </TransactionProducts>
        )}
      />
    </>
  );
};
