import React, { useState } from "react";
import { gql, useApolloClient } from "@apollo/client";
import styled, { css } from "styled-components/native";
import { Heading, Text, SubHeading } from "../../components/Text";
import { Container, ShadowBox } from "../../styles/common";
import Button from "../../components/Button";
import Theme from "../../theme";
import Togglable from "../../components/Togglable";

const Details = css`
  flex-shrink: 1;
  margin-bottom: 30px;
`;

const DetailsContainer = styled.View`
  ${Details}
`;

const Detail = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${(props) => props.mTop || 5}px;
  margin-bottom: ${(props) => props.mBottom || 5}px;
`;

const TransactionDetails = styled(ShadowBox)`
  margin-top: 15px;
  padding: 15px;
  margin-bottom: 0;
`;

const TransactionComment = styled(TransactionDetails)`
  margin: 0;
`;

const History = styled.View`
  flex-grow: 3;
`;

const Product = ({ route }) => {
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
      <DetailsContainer>
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
      </DetailsContainer>
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
        <Togglable>
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
          <TransactionComment>
            <Text>Comment was left by among us</Text>
          </TransactionComment>
        </Togglable>
      </History>
    </Container>
  );
};

export default Product;
