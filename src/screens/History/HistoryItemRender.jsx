import React from "react";
import styled from "styled-components/native";
import { View } from "react-native";

import Theme from "../../theme";
import Togglable from "../../components/Togglable";
import { Heading, Text, SubHeading } from "../../components/Text";

import {
  Detail,
  HorizontalAndVerticalCenter,
  AlignBySide,
  ShadowBox,
} from "../../styles/common";

const TransactionDetails = styled(ShadowBox)`
  ${AlignBySide}
  margin-top: 10px;
  margin-bottom: 0;
  flex-basis: 0;
`;

const HistoryItemRender = ({ item, time, AdditionalInfo, RevealInfo }) => {
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
          {AdditionalInfo}
        </View>
      </TransactionDetails>
      {RevealInfo}
    </Togglable>
  );
};

export default HistoryItemRender;
