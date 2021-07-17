import React, { useState } from "react";
import { gql, useApolloClient } from "@apollo/client";
import styled, { css } from "styled-components/native";
import { Heading, Text, SubHeading } from "../components/Text";
import { Container } from "../styles/common";
import Button from "../components/Button";
import Theme from "../theme";
import { Alert } from "react-native";

const Details = styled.View`
  flex-shrink: 1;
  margin-bottom: 30px;
`;

const Detail = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${(props) => props.mTop || 5}px;
  margin-bottom: ${(props) => props.mBottom || 5}px;
`;

const TransactionDetails = styled(Details)`
  width: 100%;
  margin-top: 15px;
  padding: 15px;
  shadow-color: #ddd;
  shadow-offset: 1px 1px;
  shadow-opacity: 1;
  shadow-radius: 3px;
  elevation: 5;
  background-color: #fff;
  margin-bottom: 0;
`;

const TransactionComment = styled(TransactionDetails)`
  margin: 0;
  margin-bottom: 30px;
  display: ${(props) => (props.visible ? "flex" : "none")};
`;

const Transaction = styled.Pressable``;

const History = styled.View`
  flex-grow: 3;
`;

const Product = ({ route }) => {
  const [commentVisible, setCommentVisible] = useState(false);
  const client = useApolloClient();
  const { id } = route.params;

  const { name, stock, brand } = client.readFragment({
    id: `Product:${id}`,
    fragment: gql`
      fragment ProductFragment on Product {
        name
        brand
        stock
      }
    `,
  });

  return (
    <Container mTop={20}>
      <Details>
        <Detail mTop={10} mBottom={10}>
          <Text>Name</Text>
          <Text color="#ABABAB">{name}</Text>
        </Detail>
        <Detail mTop={10} mBottom={10}>
          <Text>In Stock</Text>
          <Text color="#ABABAB">{stock}</Text>
        </Detail>
        <Detail mTop={10} mBottom={10}>
          <Text>Brand</Text>
          <Text color="#ABABAB">{brand}</Text>
        </Detail>
      </Details>
      <History>
        <Detail>
          <Heading>History</Heading>
          <Button
            onPress={null}
            text="Recent"
            rounded
            bgColor="white"
            padTop="3"
            padBottom="3"
            width=""
          />
        </Detail>
        <Transaction onPress={() => setCommentVisible(!commentVisible)}>
          <TransactionDetails>
            <Detail>
              <SubHeading fontSize={Theme.fontSize.body}>Date</SubHeading>
              <Text>17/05/21</Text>
            </Detail>
            <Detail>
              <SubHeading fontSize={Theme.fontSize.body}>Change</SubHeading>
              <Text>+5</Text>
            </Detail>
          </TransactionDetails>
          <TransactionComment visible={commentVisible}>
            <Text>Comment was left by among us</Text>
          </TransactionComment>
        </Transaction>
      </History>
    </Container>
  );
};

export default Product;
