import { gql } from "apollo-server";

const typeDefs = gql`
  type ProductEdge {
    node: Product!
    cursor: String!
  }

  type ProductConnection {
    edges: [ProductEdge!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }
`;

const resolvers = {};

export default {
  typeDefs,
  resolvers,
};
