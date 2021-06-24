import { gql } from "@apollo/client";

export const GET_INVENTORY = gql`
  query products {
    getInventory {
      id
      name
      brand
      stock
      history
    }
  }
`;

export const GET_PRODUCT = `
  query GetProduct($id: ID!){
    getProduct(id: $id) {
      id
      name
      brand
      stock
      history
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($product: ProductInput!) {
    createProduct(product: $product) {
      id
      name
      stock
      brand
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $product: ProductInput!) {
    updateProduct(id: $id, product: $product) {
      id
      name
      stock
      brand
      history
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;
