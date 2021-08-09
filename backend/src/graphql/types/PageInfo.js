import { gql } from "apollo-server";

const typeDefs = gql`
  type PageInfo {
    startCursor: ID
    endCursor: ID
    hasNextPage: Boolean!
  }
`;

const resolvers = {};

export default {
  typeDefs,
  resolvers,
};
