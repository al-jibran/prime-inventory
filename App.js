import React from "react";
import Main from "./src/Main";

import DeviceStorageContext from "./src/contexts/DeviceStorageContext";
import DeviceStorage from "./src/utilities/deviceStorage";

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
} from "@apollo/client";

import { relayStylePagination } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: "http://192.168.0.122:4000",
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        inventory: relayStylePagination(),
        getProductHistory: relayStylePagination(),
        transactions: relayStylePagination(),
      },
    },
  },
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

const deviceStorage = new DeviceStorage("setting");

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <DeviceStorageContext.Provider value={deviceStorage}>
        <Main />
      </DeviceStorageContext.Provider>
    </ApolloProvider>
  );
};

export default App;
