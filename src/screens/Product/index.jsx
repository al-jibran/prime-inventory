import React from "react";
import { SectionList, View } from "react-native";
import { gql, useApolloClient, useQuery } from "@apollo/client";
import styled, { css } from "styled-components/native";
import { Heading, Text, SubHeading, AdaptiveText } from "../../components/Text";
import { ShadowBox } from "../../styles/common";
import Button from "../../components/Button";
import Theme from "../../theme";
import Togglable from "../../components/Togglable";
import { GET_PRODUCT_HISTORY } from "../../graphql/queries";
import ListEmptyComponent from "../../components/ListEmptyComponent";

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

const renderItem = (item, id) => {
  if (!item) {
    return null;
  }

  const time = new Date(item.created).toLocaleTimeString("en-us", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });
  const stockChange = item?.changes.find(
    (change) => change.productId === id
  )?.change;
  return (
    <Togglable>
      <TransactionDetails>
        <Detail>
          <SubHeading fontSize={Theme.fontSize.body}>Time</SubHeading>
          <Text>{time}</Text>
        </Detail>
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
      </TransactionDetails>
      <TransactionComment>
        <Text>{item.comment}</Text>
      </TransactionComment>
    </Togglable>
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

  if (error) {
    return <Text>{error.message}</Text>;
  }

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
      renderItem={({ item }) => renderItem(item, id)}
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
