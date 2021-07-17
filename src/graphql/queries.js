import { gql } from "@apollo/client";

const ProductFragment = gql`
  fragment ProductFields on Product {
    _id
    name
    brand
    stock
  }
`;

export const GET_INVENTORY = gql`
  query Inventory(
    $after: String
    $first: Int
    $orderBy: OrderBy
    $orderDirection: OrderDirection
    $search: String
  ) {
    inventory(
      after: $after
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      search: $search
    ) {
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
    product(id: $id) {
      ...ProductFields
      history
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
  mutation UpdateProduct($id: MongoObjectID!, $change: ProductInput!) {
    updateProduct(id: $id, change: $change) {
      ...ProductFields
    }
  }
  ${ProductFragment}
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: MongoObjectID!) {
    deleteProduct(id: $id) {
      _id
    }
  }
`;

export const BULK_UPDATE_PRODUCTS = gql`
  mutation BulkUpdateProducts($bill: Bill!) {
    bulkUpdateProducts(bill: $bill) {
      _id
    }
  }
`;
