import { InMemoryCache, makeVar } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

export const productsOrder = makeVar({
  orderDirection: "DESC",
  orderBy: "CREATED_AT",
});

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        inventory: relayStylePagination(),
        getProductHistory: relayStylePagination(),
        transactions: relayStylePagination(),
        productOrder: {
          read() {
            return productsOrder();
          },
        },
      },
    },
  },
});
