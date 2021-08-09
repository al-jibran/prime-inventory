import { gql } from "apollo-server";
import { paginateResults } from "../../utils/pagination";

const typeDefs = gql`
  enum FilterTransactionsBy {
    ALL
    BILL
  }

  extend type Query {
    """
    Returns the transactions.
    """
    transactions(
      after: String
      first: Int
      filterBy: FilterTransactionsBy
    ): TransactionConnection!

    transactionsDate(date: String!): [DateTime]
    transactionsOnDate(date: Int!, month: Int!, year: Int!): [Transaction]!
  }
`;

const resolvers = {
  Query: {
    transactions: async (
      _,
      { after, first, filterBy },
      { dataSources: { transactions } }
    ) => {
      const getList = transactions.getTransactions.bind(transactions);
      const getCount = transactions.getCount.bind(transactions);

      const result = await paginateResults(
        { after, first, orderBy: filterBy },
        getList,
        getCount
      );
      return result;
    },

    transactionsDate: async (
      _,
      { date },
      { dataSources: { transactions } }
    ) => {
      console.time("dates");
      const month = new Date(date).getMonth() + 1;
      const year = new Date(date).getFullYear();
      const datesObj = await transactions.getDates(month, year);
      const res = datesObj.map((obj) => obj.date);

      console.timeEnd("dates");
      return res;
    },

    transactionsOnDate: async (
      _,
      { date, month, year },
      { dataSources: { transactions } }
    ) => {
      const res = await transactions.getTransactionsOnDate(date, month, year);
      return res;
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
