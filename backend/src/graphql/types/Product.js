import { gql } from "apollo-server";

const typeDefs = gql`
  type Product {
    _id: MongoObjectID!
    name: String!
    stock: Int!
    brand: String!
    history: [MongoObjectID!]
  }
`;

const resolvers = {};

export default {
  typeDefs,
  resolvers,
};
