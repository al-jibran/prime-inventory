import React from "react";
import { Text, Heading } from "../components/Text";

const Product = ({ route }) => {
  const params = route.params;
  return <Heading>Hello, {params.name}</Heading>;
};

export default Product;
