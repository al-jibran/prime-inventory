import { gql } from "apollo-server";
import { paginateResults } from "../../utils/pagination";

const typeDefs = gql`
  enum OrderDirection {
    ASC
    DESC
  }

  enum OrderBy {
    CREATED_AT
    NAME
  }

  extend type Query {
    """
    Returns paginated inventory
    """
    inventory(
      after: String
      first: Int
      orderDirection: OrderDirection
      orderBy: OrderBy
      search: String
    ): ProductConnection!
  }
`;

const resolvers = {
  Query: {
    inventory: async (
      _,
      { after, first, orderDirection, orderBy, search },
      { dataSources: { products } }
    ) => {
      const getList = products.getInventory.bind(products);
      const getCount = products.getCount.bind(products);

      const result = paginateResults(
        { after, first, orderDirection, orderBy, search },
        getList,
        getCount
      );
      return result;
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
