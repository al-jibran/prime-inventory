import { gql } from "apollo-server";
import { UserInputError, ForbiddenError } from "apollo-server-errors";

const typeDefs = gql`
  type DeleteProductPayload {
    """
    Payload for returning the deleted product id.
    """
    _id: MongoObjectID!
  }

  extend type Mutation {
    """
    Deletes an item by id and returns the id.
    """
    deleteProduct(id: MongoObjectID!): DeleteProductPayload!
  }
`;

const resolvers = {
  Mutation: {
    deleteProduct: async (_, { id }, { dataSources: { products } }) => {
      const product = await products.getProduct(id);

      if (!product) {
        throw new UserInputError(
          "Product does not exist and cannot be deleted",
          {
            args: { id },
          }
        );
      } else if (product.history && product.history.length > 1) {
        throw new ForbiddenError(
          "The product has transactions and cannot be deleted"
        );
      }

      try {
        await products.removeProduct(id);
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return { _id: product._id };
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
