import { gql } from "apollo-server";
import { UserInputError } from "apollo-server-errors";
import { paginateResults } from "../../utils/pagination";

const typeDefs = gql`
  extend type Query {
    """
    Returns a single product.
    """
    product(id: MongoObjectID!): Product
    getProductHistory(
      id: MongoObjectID!
      after: String
      first: Int
    ): TransactionConnection!
  }
`;

const resolvers = {
  Query: {
    product: async (_, { id }, { dataSources: { products } }) => {
      const productFound = await products.getProduct(id); //If the history field has less than 20 items, return the entire product. Else, return 10 items with pagination.
      if (!productFound) {
        throw new UserInputError("Product was not found", {
          args: { id },
        });
      }
      return productFound;
    },

    getProductHistory: async (
      _,
      { id, after, first },
      { dataSources: { products } }
    ) => {
      const productFound = await products.getProduct(id);
      if (!productFound) {
        throw new UserInputError("Product was not found", {
          args: { id },
        });
      }

      const productWithCollection = {
        ...products,
        product_id: productFound._id,
      };
      const getList = products.getProductHistory.bind(productWithCollection);
      const getCount = products.getHistoryCount.bind(productWithCollection);
      const paginatedHistory = await paginateResults(
        { after, first },
        getList,
        getCount
      );

      return paginatedHistory;
    },
  },
};

export default { typeDefs, resolvers };
