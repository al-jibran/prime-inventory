import { gql } from "apollo-server";

const typeDefs = gql`
  input ProductInput {
    name: String!
    stock: Int!
    brand: String!
    comment: String!
  }
`;

const resolvers = {};

export default {
  typeDefs,
  resolvers,
};
