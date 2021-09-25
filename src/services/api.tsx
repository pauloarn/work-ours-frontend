import axios from 'axios';

const api = axios.create({
    baseURL: 'https://workpoint-test.herokuapp.com',
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(
    (config) => {
        // perform a task before the request is sent
        const token = localStorage.getItem("@token");
        config.headers.Authorization = `Bearer ${token}`;

        return config;
    },
    (error) => {
        // handle the error
        return Promise.reject(error);
    }
);

export default api