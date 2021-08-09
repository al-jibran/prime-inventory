import { gql } from "apollo-server";
import { GraphQLScalarType, Kind } from "graphql";

const dateScalar = new GraphQLScalarType({
  name: "DateTime",
  description: "DateTime custom scalar type",
  serialize: (value) => value,
  parseValue: (value) => new Date(value),
  parseLiteral: (ast) => {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }

    return null;
  },
});

const typeDefs = gql`
  scalar DateTime
`;

const resolvers = {
  DateTime: dateScalar,
};

export default {
  typeDefs,
  resolvers,
};
