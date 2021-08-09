import { gql } from "apollo-server";
import { GraphQLScalarType, Kind } from "graphql";
import { ObjectId } from "mongodb";

const mongoObjectIDScalar = new GraphQLScalarType({
  name: "MongoObjectID",
  description: "MongoDB Object ID scalar type",
  serialize: (value) => value,
  parseValue: (value) => new ObjectId(value),
  parseLiteral: (ast) => {
    if (ast.kind === Kind.STRING) {
      return new ObjectId(ast.value); // value from the client query
    }
    return null;
  },
});

const typeDefs = gql`
  scalar MongoObjectID
`;

const resolvers = {
  MongoObjectID: mongoObjectIDScalar,
};

export default {
  typeDefs,
  resolvers,
};
