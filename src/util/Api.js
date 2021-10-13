import axios from 'axios';
import Config from "@config/Config";

const {API_KEY} = Config;

axios.create({
  // baseURL: 'api/v1/',
  headers: {
    'Content-Type': 'application/json'
  }
});

// axios.defaults.withCredentials = true;

axios.defaults.params = {apikey: API_KEY};
axios.interceptors.request.use((config) => {
    return config;
});

axios.interceptors.response.use((response) => {
	return response;
}, (error) => {
	return Promise.reject(error);
});

export default axios;
