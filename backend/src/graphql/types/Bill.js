import { gql } from "apollo-server";

const typeDefs = gql`
  input Entry {
    _id: MongoObjectID!
    name: String!
    stock: Int!
  }

  input Bill {
    comment: String!
    entries: [Entry!]!
  }
`;

const resolvers = {};

export default {
  typeDefs,
  resolvers,
};
