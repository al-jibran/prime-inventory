import React from "react";
import styled from "styled-components";
import { Text, SubText } from "../../components/Text";
import { ShadowBox, Detail } from "../../styles/common";
import Theme from "../../theme";

const TransactionDetails = styled(ShadowBox)`
  margin-top: 15px;
  padding: 8px 15px;
  margin-bottom: 0;
`;

const TransactionCommentStyle = styled(TransactionDetails)`
  margin: 0;
`;

const TransactionComment = ({ item }) => {
  return (
    <>
      <TransactionCommentStyle>
        <Detail>
          <SubText fontWeight={Theme.fontWeight.bold}>Comment</SubText>
        </Detail>
        <Text fontWeight={Theme.fontWeight.light}>{item.comment}</Text>
      </TransactionCommentStyle>
    </>
  );
};

export default TransactionComment;
