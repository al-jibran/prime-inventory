import React, { useEffect } from "react";
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
  uri: "http://192.168.0.198:4000",
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getInventory: relayStylePagination(),
      },
    },
  },
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

const deviceStorage = new DeviceStorage("setting");
const unitStorage = new DeviceStorage("unit");

const App = () => {
  useEffect(() => {
    const removeOldSettings = async () => {
      await unitStorage.removeValueStored("pcs");
      await unitStorage.removeValueStored("box");
      await unitStorage.removeValueStored("peti");
    };

    removeOldSettings();
  });

  return (
    <ApolloProvider client={apolloClient}>
      <DeviceStorageContext.Provider value={deviceStorage}>
        <Main />
      </DeviceStorageContext.Provider>
    </ApolloProvider>
  );
};

export default App;
