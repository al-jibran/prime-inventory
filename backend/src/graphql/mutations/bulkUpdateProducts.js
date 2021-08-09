import { gql } from "apollo-server";
import { createBillTransaction } from "../../utils/createTransaction";

const typeDefs = gql`
  extend type Mutation {
    bulkUpdateProducts(bill: Bill!): Transaction
  }
`;

const resolvers = {
  Mutation: {
    bulkUpdateProducts: async (
      _,
      { bill },
      { mongodbClient, dataSources: { products, transactions } }
    ) => {
      const session = mongodbClient.startSession();
      let transaction;
      try {
        await session.withTransaction(async () => {
          transaction = await createBillTransaction(bill, products);
          const transactionId = await transactions.addTransaction(
            transaction,
            session
          );

          await products.updateManyProducts(
            bill.entries,
            transactionId,
            session
          );
        });
        return transaction;
      } catch (error) {
        console.log(error.message);
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
