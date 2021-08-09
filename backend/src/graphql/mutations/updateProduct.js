import { gql } from "apollo-server";
import { UserInputError } from "apollo-server-errors";
import { createProductTransaction } from "../../utils/createTransaction";

const typeDefs = gql`
  extend type Mutation {
    """
    Updates a product by id and returns the updated product.
    """
    updateProduct(id: MongoObjectID!, change: ProductInput!): Product!
  }
`;

const resolvers = {
  Mutation: {
    updateProduct: async (
      _,
      { id, change },
      { mongodbClient, dataSources: { products, transactions } }
    ) => {
      const session = mongodbClient.startSession();
      try {
        const productToUpdate = await products.getProduct(id);

        if (!productToUpdate) {
          throw new UserInputError("Product was not found");
        }

        let updatedProduct;

        await session.withTransaction(async () => {
          const updateParams = {
            $set: {
              name: change.name,
              brand: change.brand,
            },
            $inc: { stock: change.stock },
          };

          if (change.stock) {
            const newTransaction = createProductTransaction(
              change,
              productToUpdate
            );

            const transactionId = await transactions.addTransaction(
              newTransaction,
              session
            );

            updateParams["$push"] = { history: transactionId };
          }

          updatedProduct = await products.updateProduct(
            id,
            updateParams,
            session
          );
        });
        return updatedProduct;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: { id, change },
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
