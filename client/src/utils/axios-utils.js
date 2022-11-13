import axios from 'axios';

const path = 'http://34.125.144.144:4500/';
const _axios = axios.create({
  timeout: 60000,
  baseURL: path,
});

_axios.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default _axios;
