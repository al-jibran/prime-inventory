import { gql } from "@apollo/client";

const ProductFragment = gql`
  fragment ProductFields on Product {
    id
    name
    brand
    stock
    history
  }
`;

export const GET_INVENTORY = gql`
  query products($after: ID, $pageSize: Int) {
    getInventory(after: $after, pageSize: $pageSize) {
      node {
        edges {
          ...ProductFields
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        pageSize
      }
    }
  }
  ${ProductFragment}
`;

export const GET_PRODUCT = `
  query GetProduct($id: ID!){
    getProduct(id: $id) {
      ...ProductFields
    }
  }
${ProductFragment}`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($product: ProductInput!) {
    createProduct(product: $product) {
      ...ProductFields
    }
  }
  ${ProductFragment}
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $product: ProductInput!) {
    updateProduct(id: $id, product: $product) {
      ...ProductFields
    }
  }
  ${ProductFragment}
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;
