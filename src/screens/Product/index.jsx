import React from "react";
import { SectionList, View } from "react-native";
import { gql, useApolloClient, useQuery } from "@apollo/client";
import styled from "styled-components/native";
import { Heading, Text, SubHeading } from "../../components/Text";
import Button from "../../components/Button";
import { GET_PRODUCT_HISTORY } from "../../graphql/queries";
import ListEmptyComponent from "../../components/ListEmptyComponent";
import HistoryItemRender from "../History/HistoryItemRender";
import { Detail, TopContainerStyle } from "../../styles/common";

const DetailsContainer = styled.View`
  ${TopContainerStyle}
`;

const History = styled.View``;

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

const Product = ({ route }) => {
  const { id } = route.params;
  const { data, loading, error, fetchMore } = useQuery(GET_PRODUCT_HISTORY, {
    variables: { id, first: 8 },
    onCompleted: (data) => {
      console.log(data.getProductHistory.totalCount);
    },
    onError: (error) => {
      console.log(error.message);
    },
    fetchPolicy: "cache-and-network",
  });

  const history = data
    ? data.getProductHistory.edges.map((edge) => edge.node)
    : [];
  const dates = new Set();

  for (let item of history) {
    dates.add(new Date(item.created).toDateString());
  }

  let sectionData = [];
  for (let date of dates.values()) {
    const sameDateHistory = history.filter(
      (his) => new Date(his.created).toDateString() === date
    );

    const sectionItem = {
      title: date,
      data: sameDateHistory,
    };

    sectionData.push(sectionItem);
  }

  const onEndReached = () => {
    const canFetchMore =
      !loading && data?.getProductHistory.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data?.getProductHistory.pageInfo.endCursor,
      },
    });
  };

  return (
    <SectionList
      sections={sectionData}
      keyExtractor={(item) => item._id}
      stickySectionHeadersEnabled={false}
      onEndReached={onEndReached}
      onEndReachedThreshold={0}
      ListHeaderComponent={<ListHeaderComponent id={id} />}
      renderSectionHeader={({ section: { title } }) => (
        <View style={{ marginTop: 15 }}>
          <SubHeading align="center">{title}</SubHeading>
        </View>
      )}
      renderItem={({ item }) => (
        <HistoryItemRender item={item} id={id} historyOf="product" />
      )}
      ListEmptyComponent={
        <ListEmptyComponent
          loading={loading}
          error={error}
          text={["The product's history is currently empty."]}
        />
      }
      style={{ marginTop: 20 }}
      contentContainerStyle={{ marginLeft: 20, marginRight: 20, flexGrow: 1 }}
    />
  );
};

export default Product;
