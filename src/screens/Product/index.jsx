import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { gql, useApolloClient, useQuery } from "@apollo/client";
import styled, { css } from "styled-components/native";
import { Heading, Text, SubHeading } from "../../components/Text";
import { Container, ShadowBox } from "../../styles/common";
import Button from "../../components/Button";
import Theme from "../../theme";
import Togglable from "../../components/Togglable";
import { GET_PRODUCT_HISTORY } from "../../graphql/queries";

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
  padding: 8px 15px;
  margin-bottom: 0;
`;

const TransactionComment = styled(TransactionDetails)`
  margin: 0;
`;

const History = styled.View`
  flex-grow: 3;
`;

const ListHeaderComponent = ({ id }) => {
  const client = useApolloClient();

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
    <View>
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
      </History>
    </View>
  );
};

const renderItem = ({ item }) => {
  const date = new Date(item.created).toLocaleDateString();
  const time = new Date(item.created).toLocaleTimeString();
  return (
    <Togglable>
      <TransactionDetails>
        <Detail>
          <SubHeading fontSize={Theme.fontSize.body}>Date</SubHeading>
          <Text>
            {date} | {time}
          </Text>
        </Detail>
        <Detail>
          <SubHeading fontSize={Theme.fontSize.body}>Change</SubHeading>
          <Text>+5</Text>
        </Detail>
      </TransactionDetails>
      <TransactionComment>
        <Text>{item.comment}</Text>
      </TransactionComment>
    </Togglable>
  );
};

const Product = ({ route }) => {
  const { id } = route.params;
  const { data, loading, error } = useQuery(GET_PRODUCT_HISTORY, {
    variables: { id, first: 7 },
  });

  if (error) {
    return <Text>{error.message}</Text>;
  }

  const history = data?.getProductHistory.edges.map((edge) => edge.node);

  return (
    <Container mTop={20}>
      <FlatList
        data={history}
        ListHeaderComponent={<ListHeaderComponent id={id} />}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={() => {
          if (loading) {
            return <Text>Loading...</Text>;
          }
          if (error) {
            return <Text>{error.message}</Text>;
          }

          return (
            <Text>
              There doesn&amp;t seem to be anyhthing here. This product&amp;s
              history will appear here.
            </Text>
          );
        }}
      />
    </Container>
  );
};

export default Product;
