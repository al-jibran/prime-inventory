import React from "react";
import { gql, useApolloClient } from "@apollo/client";
import { Text, Heading } from "../components/Text";
import { GET_PRODUCT } from "../graphql/queries";

const Product = ({ route }) => {
  const client = useApolloClient();
  const { id } = route.params;

  const { name, brand, stock } = client.readFragment({
    id: `Product:${id}`,
    fragment: gql`
      fragment P1 on Product {
        name
        brand
        stock
      }
    `,
  });

  return <Heading>Hello, {name}</Heading>;
};

export default Product;
