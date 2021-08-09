import { gql } from "apollo-server";

const typeDefs = gql`
  type TransactionEdge {
    node: Transaction!
    cursor: String!
  }

  type TransactionConnection {
    edges: [TransactionEdge]!
    pageInfo: PageInfo!
    totalCount: Int!
  }
`;

const resolvers = {};

export default {
  typeDefs,
  resolvers,
};
