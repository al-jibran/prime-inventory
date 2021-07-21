import React from "react";
import styled from "styled-components";
import { View, FlatList } from "react-native";
import { Heading, Text, SubHeading, AdaptiveText } from "../../components/Text";

import Theme from "../../theme";
import Togglable from "../../components/Togglable";
import {
  ShadowBox,
  Detail,
  HorizontalAndVerticalCenter,
  AlignBySide,
} from "../../styles/common";
import {
  ProductHistoryInfo,
  ProductHistoryReveal,
} from "../Product/ProductHistory";

const TransactionDetails = styled(ShadowBox)`
  ${AlignBySide}
  margin-top: 15px;
  margin-bottom: 0;
  flex-basis: 0;
`;

const TransactionComment = styled(TransactionDetails)`
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 8px 15px;
  margin: 0;
`;

const TransactionContent = styled(ShadowBox)`
  padding: 8px 15px;
  flex: 1;
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
    return <TransactionHistoryInfo item={item} />;
  };

  const RevealInfo = () => {
    if (historyOf === "product") {
      return <ProductHistoryReveal item={item} />;
    }
    return <TransactionHistoryReveal item={item} />;
  };

  return (
    <Togglable>
      <TransactionDetails>
        <HorizontalAndVerticalCenter
          style={{
            backgroundColor:
              item.type === "BILL" ? Theme.color.danger : Theme.color.primary,
            height: "100%",
            flexBasis: "5%",
            opacity: 0.69,
          }}
        >
          <Heading color="white">{item.type === "BILL" ? "B" : "P"}</Heading>
        </HorizontalAndVerticalCenter>
        <View
          style={{
            flexBasis: "85%",
            padding: 8,
          }}
        >
          <Detail>
            <SubHeading fontSize={Theme.fontSize.body}>Time</SubHeading>
            <Text>{time}</Text>
          </Detail>
          {item.type === "BILL" && (
            <Detail>
              <SubHeading fontSize={Theme.fontSize.body}>
                Bill Number
              </SubHeading>
              <Text>PTB-{item.bill_no}</Text>
            </Detail>
          )}
          <AdditionalInfo />
        </View>
      </TransactionDetails>
      <RevealInfo />
    </Togglable>
  );
};

const TransactionHistoryInfo = ({ item }) => {
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
          <AdaptiveText>
            {changes.change > 0 && "+"}
            {changes.change}
          </AdaptiveText>
        </Detail>
      </>
    );
  }
  return null;
};

const TransactionHistoryReveal = ({ item }) => {
  if (item.type === "PRODUCT") {
    return <ProductHistoryReveal item={item} />;
  }

  return (
    <View>
      <TransactionComment>
        <Text>{item.comment}</Text>
      </TransactionComment>
      <FlatList
        style={{ margin: 0 }}
        data={item.changes}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <TransactionContent>
            <Detail>
              <Text size={Theme.fontSize.body}>{item.name}</Text>
              <AdaptiveText>
                {item.change > 0 && "+"}
                {item.change}
              </AdaptiveText>
            </Detail>
          </TransactionContent>
        )}
      />
    </View>
  );
};

export default HistoryItemRender;
