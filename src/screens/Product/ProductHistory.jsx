import React from "react";

import { SubHeading, AdaptiveText } from "../../components/Text";
import Theme from "../../theme";
import { Detail } from "../../styles/common";
import TransactionComment from "../History/TransactionComment";

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
  return <TransactionComment item={item} />;
};
