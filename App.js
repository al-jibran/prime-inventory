import React from 'react';
import Main from './src/Main';

import getEnvVars from './environment';
import DeviceStorageContext from './src/contexts/DeviceStorageContext';
import DeviceStorage from './src/utilities/deviceStorage';
import { cache } from './Cache';

import { ApolloClient, HttpLink, ApolloProvider } from '@apollo/client';

const { apiUrl } = getEnvVars();

const httpLink = new HttpLink({
	uri: apiUrl,
});

const apolloClient = new ApolloClient({
	link: httpLink,
	cache,
});

const deviceStorage = new DeviceStorage('setting');

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
