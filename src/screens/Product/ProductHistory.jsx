import React from "react";
import styled from "styled-components";
import { Text, SubHeading, AdaptiveText, SubText } from "../../components/Text";

import Theme from "../../theme";
import { ShadowBox, Detail } from "../../styles/common";

const TransactionDetails = styled(ShadowBox)`
  margin-top: 15px;
  padding: 8px 15px;
  margin-bottom: 0;
`;

const TransactionComment = styled(TransactionDetails)`
  margin: 0;
`;

export const ProductHistoryInfo = ({ item, id }) => {
  const stockChange = item?.changes.find(
    (change) => change.productId === id
  )?.change;

  return (
    <>
      <Detail>
        <SubHeading fontSize={Theme.fontSize.body}>Change</SubHeading>
        <AdaptiveText fontWeight={Theme.fontWeight.light}>
          {stockChange > 0 && "+"}
          {stockChange}
        </AdaptiveText>
      </Detail>
    </>
  );
};

export const ProductHistoryReveal = ({ item }) => {
  return (
    <>
      <TransactionComment>
        <Detail>
          <SubText fontWeight={Theme.fontWeight.bold}>Comment</SubText>
        </Detail>
        <Text fontWeight={Theme.fontWeight.light}>{item.comment}</Text>
      </TransactionComment>
    </>
  );
};
