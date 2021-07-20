import React from "react";
import styled from "styled-components";
import { View } from "react-native";
import { Heading, Text, SubHeading } from "../../components/Text";

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
        <HorizontalAndVerticalCenter
          style={{
            backgroundColor:
              item.type === "BILL" ? Theme.color.danger : Theme.color.primary,
            height: "100%",
            flexGrow: 2,
            opacity: 0.69,
          }}
        >
          <Heading color="white">{item.type === "BILL" ? "B" : "P"}</Heading>
        </HorizontalAndVerticalCenter>
        <View style={{ flexGrow: 8, padding: 8 }}>
          <Detail>
            <SubHeading fontSize={Theme.fontSize.body}>Time</SubHeading>
            <Text>{time}</Text>
          </Detail>
          <AdditionalInfo />
        </View>
      </TransactionDetails>
      <RevealInfo />
    </Togglable>
  );
};

export default HistoryItemRender;
