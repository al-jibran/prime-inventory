import React, { useState } from "react";
import { SectionList, View } from "react-native";
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

const renderItem = ({ item }) => {
  const time = new Date(item.created).toLocaleTimeString("en-us", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <Togglable>
      <TransactionDetails>
        <Detail>
          <SubHeading fontSize={Theme.fontSize.body}>Time</SubHeading>
          <Text>{time}</Text>
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
  const [sectionData, setSectionData] = useState([]);
  const { data, loading, error, fetchMore } = useQuery(GET_PRODUCT_HISTORY, {
    variables: { id, first: 7 },
    onCompleted: (data) => {
      console.log(data.getProductHistory.totalCount);
      const history = data.getProductHistory.edges.map((edge) => edge.node);
      const transformed = transformDataForSection(history);
      setSectionData(transformed);
    },
    onError: (error) => {
      console.log(error.message);
    },
    fetchPolicy: "cache-and-network",
  });

  if (error) {
    return <Text>{error.message}</Text>;
  }

  const transformDataForSection = (history) => {
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

    return sectionData;
  };

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
    <Container mTop={20}>
      <SectionList
        sections={sectionData}
        ListHeaderComponent={<ListHeaderComponent id={id} />}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        stickySectionHeadersEnabled={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.05}
        renderSectionHeader={({ section: { title } }) => (
          <View style={{ marginTop: 15 }}>
            <SubHeading align="center">{title}</SubHeading>
          </View>
        )}
        ListEmptyComponent={() => {
          if (loading) {
            return <Text>Loading...</Text>;
          }
          if (error) {
            return <Text>{error.message}</Text>;
          }

          return (
            <Text>
              There doesn&apos;t seem to be anything here. This product&apos;s
              history will appear here.
            </Text>
          );
        }}
      />
    </Container>
  );
};

export default Product;
