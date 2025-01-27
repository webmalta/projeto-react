import axios from 'axios';

const api = axios.create({
    baseURL: 'https://6797c2ffc2c861de0c6de7ca.mockapi.io/api/v1/dragon'
});

export default api;