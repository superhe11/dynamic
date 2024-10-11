import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000'
});

export const getItems = () => api.get('/items');
export const createItem = (data) => api.post('/items', data);
export const updateItem = (id, data) => api.put(`/items/${id}`, data);
