import { gql } from "apollo-server";

const typeDefs = gql`
  type Change {
    productId: MongoObjectID!
    stockBefore: Int!
    change: Int!
    name: String!
  }

  enum TransactionType {
    BILL
    PRODUCT
  }

  type Transaction {
    _id: MongoObjectID!
    comment: String!
    type: TransactionType!
    created: DateTime!
    changes: [Change!]!
    bill_no: String
  }
`;

const resolvers = {};

export default {
  typeDefs,
  resolvers,
};
