import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useApolloClient, gql } from "@apollo/client";
import { View } from "react-native";
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
import { GET_PRODUCT } from "../../graphql/queries";

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
    return <TransactionHistoryInfo item={item} />;
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
              <Text>PBR-{item.bill_no}</Text>
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
  const client = useApolloClient();
  const [product, setProduct] = useState(null);
  const { productId, change } = item.changes[0];

  useEffect(() => {
    // To fix 'Can't perform a react state update on unmouted component' error
    let isMounted = true;

    const fetch = async (item) => {
      const { data } = await fetchProduct(client, productId);
      if (isMounted) {
        setProduct(data.product);
      }
    };

    item && item.type === "PRODUCT" && fetch(item);

    return () => {
      isMounted = false;
    };
  }, []);

  if (product) {
    return (
      <>
        <Detail>
          <SubHeading fontSize={Theme.fontSize.body}>Product Name</SubHeading>
          <Text>{product.name}</Text>
        </Detail>
        <Detail>
          <SubHeading fontSize={Theme.fontSize.body}>Change</SubHeading>
          <AdaptiveText>
            {change > 0 && "+"}
            {change}
          </AdaptiveText>
        </Detail>
      </>
    );
  }
  return null;
};

const fetchProduct = (client, productId) => {
  const productInCache = client.readFragment({
    id: `Product:${productId}`,
    fragment: gql`
      fragment ProductFragment2 on Product {
        name
      }
    `,
  });

  if (!productInCache) {
    return client.query({
      query: GET_PRODUCT,
      variables: { id: productId },
    });
  } else {
    return new Promise((resolve, reject) => {
      resolve({ data: { product: productInCache } });
      reject("Couldn't retrieve value from cache");
    });
  }
};

export default HistoryItemRender;
