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
  query inventory($after: String, $first: Int) {
    getInventory(after: $after, first: $first) {
      edges {
        node {
          ...ProductFields
        }
        cursor
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      totalCount
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
      node {
        ...ProductFields
      }
      cursor
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
