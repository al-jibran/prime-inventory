import Constants from 'expo-constants';

export const prodUrl = 'https://someapp.example.com';

const ENV = {
	dev: {
		apiUrl: 'http://192.168.1.1:5000/', // change the IP address to the backend server.
	},
	staging: {
		apiUrl: prodUrl,
	},
	prod: {
		apiUrl: prodUrl,
	},
};

const getEnvVars = () => {
	const env = Constants.manifest.releaseChannel;
	console.log('env:', env);
	if (env === null || env === undefined || env === '') return ENV.dev;
	if (env.indexOf('dev') !== -1) return ENV.dev;
	if (env.indexOf('staging') !== -1) return ENV.staging;
	if (env.indexOf('prod') !== -1) return ENV.prod;
};

export default getEnvVars;
