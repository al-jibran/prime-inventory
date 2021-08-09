import { gql } from "apollo-server";
import { createCursor } from "../../utils/pagination";
import { UserInputError } from "apollo-server-errors";
import { createProductTransaction } from "../../utils/createTransaction";

const typeDefs = gql`
  extend type Mutation {
    """
    Creates a product by taking in name, stock, brand and comment as object parameter.
    Returns an edge with cursor and node for pagination.
    """
    createProduct(product: ProductInput!): ProductEdge!
  }
`;

const resolvers = {
  Mutation: {
    createProduct: async (
      _,
      { product },
      { mongodbClient, dataSources: { products, transactions } }
    ) => {
      const session = mongodbClient.startSession();

      try {
        let newProduct;
        await session.withTransaction(async () => {
          const { _id } = await products.addProduct(product, session);
          const newTransaction = createProductTransaction(product, { _id });

          const transactionId = await transactions.addTransaction(
            newTransaction,
            session
          );

          const change = { $push: { history: transactionId } };

          newProduct = await products.updateProduct(_id, change, session);
        });

        return {
          node: newProduct,
          cursor: createCursor([newProduct._id]),
        };
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: { product },
        });
      } finally {
        session.endSession();
      }
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
