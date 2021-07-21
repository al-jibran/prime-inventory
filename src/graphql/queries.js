import { gql } from "@apollo/client";

const ProductFragment = gql`
  fragment ProductFields on Product {
    _id
    name
    brand
    stock
  }
`;

const TransactionFragment = gql`
  fragment TransactionFields on Transaction {
    _id
    comment
    type
    created
    bill_no
    changes {
      productId
      change
      name
    }
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

export const GET_PRODUCT = gql`
  query Product($id: MongoObjectID!) {
    product(id: $id) {
      _id
      name
    }
  }
`;

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

export const GET_PRODUCT_HISTORY = gql`
  query GetProductHistory($id: MongoObjectID!, $after: String, $first: Int) {
    getProductHistory(id: $id, after: $after, first: $first) {
      edges {
        node {
          ...TransactionFields
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
  ${TransactionFragment}
`;

export const GET_TRANSACTIONS = gql`
  query Transactions($after: String, $first: Int) {
    transactions(after: $after, first: $first) {
      edges {
        node {
          ...TransactionFields
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
  ${TransactionFragment}
`;
