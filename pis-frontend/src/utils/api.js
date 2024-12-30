import axios from 'axios';

const API_BASE_URL = 'http://localhost:8180';

export const signup = async (data) => {
    return await axios.post(`${API_BASE_URL}/auth/signup`, data);
};

export const login = async (data) => {
    return await axios.post(`${API_BASE_URL}/auth/login`, data);
};
