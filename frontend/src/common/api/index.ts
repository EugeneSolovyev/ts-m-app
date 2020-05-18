import axios from 'axios';

const JWT_TOKEN_KEY: string = 'JWT_TOKEN_KEY';

const onFullfiled = (response: any) => {
	return response.data;
};

const onRejected = (error: any) => {
	throw new Error(error)
};

const HTTP = axios.create({
	baseURL: 'http://5.101.51.243:8080',
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': 'http://5.101.51.243:8080',
	},
});

HTTP.interceptors.request.use((config: any) => ({
	...config,
	headers: {
		...config.headers,
		Authorization: localStorage.getItem(JWT_TOKEN_KEY),
	},
}));

HTTP.interceptors.response.use(onFullfiled, onRejected);

export default HTTP;
