import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json;charset=utf-8'
    }
});

export default api;