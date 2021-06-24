import { gql } from "@apollo/client";

export const GET_INVENTORY = gql`
  query {
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

export const CREATE_PRODUCT = `
  mutation CreateProduct($product: ProductInput!) {
    createProduct(product: $product) {
      id
      name
      stock
      brand
      history
    }
  }
`;

export const UPDATE_PRODUCT = `
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

export const DELETE_PRODUCT = `
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;
