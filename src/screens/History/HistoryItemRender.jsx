import React from "react";
import styled from "styled-components";
import { Text, SubHeading, AdaptiveText } from "../../components/Text";

import Theme from "../../theme";
import Togglable from "../../components/Togglable";
import { ShadowBox, Detail } from "../../styles/common";

const TransactionDetails = styled(ShadowBox)`
  margin-top: 15px;
  padding: 8px 15px;
  margin-bottom: 0;
`;

const TransactionComment = styled(TransactionDetails)`
  margin: 0;
`;

const HistoryItemRender = ({ item, id, historyOf }) => {
  if (!item) {
    return null;
  }

  const time = new Date(item.created).toLocaleTimeString("en-us", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });

  const AdditionalInfo = () => {
    if (historyOf === "product") {
      return <ProductHistoryInfo item={item} id={id} />;
    }
    return null;
  };

  const RevealInfo = () => {
    if (historyOf === "product") {
      return <ProductHistoryReveal item={item} />;
    }
    return null;
  };

  return (
    <Togglable>
      <TransactionDetails>
        <Detail>
          <SubHeading fontSize={Theme.fontSize.body}>Time</SubHeading>
          <Text>{time}</Text>
        </Detail>
        <AdditionalInfo />
      </TransactionDetails>
      <RevealInfo />
    </Togglable>
  );
};

const ProductHistoryInfo = ({ item, id }) => {
  const stockChange = item?.changes.find(
    (change) => change.productId === id
  )?.change;

  return (
    <>
      <Detail>
        <SubHeading fontSize={Theme.fontSize.body}>Change</SubHeading>
        <AdaptiveText>
          {stockChange > 0 && "+"}
          {stockChange}
        </AdaptiveText>
      </Detail>
      {item.type === "BILL" && (
        <Detail>
          <SubHeading fontSize={Theme.fontSize.body}>Bill No</SubHeading>
          <Text>{item.bill_no}</Text>
        </Detail>
      )}
    </>
  );
};

const ProductHistoryReveal = ({ item }) => {
  return (
    <>
      <TransactionComment>
        <Text>{item.comment}</Text>
      </TransactionComment>
    </>
  );
};

export default HistoryItemRender;
