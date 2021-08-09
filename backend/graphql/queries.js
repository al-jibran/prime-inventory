export const GET_INVENTORY = `
query Inventory($after: String, $first: Int, $orderDirection: OrderDirection, $orderBy: OrderBy, $search: String) {
  inventory(after: $after, first: $first, orderDirection: $orderDirection, orderBy: $orderBy, search: $search) {
    edges {
      node {
        _id
        name
        brand
        stock
        history
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
`;

export const GET_PRODUCT = `
  query GetProduct($id: MongoObjectID!){
    product(id: $id) {
      _id
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
      node {
        _id
        name
        brand
        stock
        history
      }
      cursor
    }
  }
`;

export const UPDATE_PRODUCT = `
  mutation UpdateProduct($id: MongoObjectID!, $change: ProductInput!) {
    updateProduct(id: $id, change: $change) {
      _id
      name
      brand
      stock
      history
    }
  }
`;

export const DELETE_PRODUCT = `
  mutation DeleteProduct($id: MongoObjectID!) {
    deleteProduct(id: $id) {
      _id
    }
  }
`;
