import React from "react";
import { gql, useApolloClient } from "@apollo/client";
import { Heading } from "../components/Text";

const Product = ({ route }) => {
  const client = useApolloClient();
  const { id } = route.params;

  const { name } = client.readFragment({
    id: `Product:${id}`,
    fragment: gql`
      fragment ProductFragment on Product {
        name
        brand
        stock
      }
    `,
  });

  return <Heading>Hello, {name}</Heading>;
};

export default Product;
