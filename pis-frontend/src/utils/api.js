import axios from 'axios';

const API_BASE_URL = window.location.origin + '/api';

export const signup = async (data) => {
    return await axios.post(`${API_BASE_URL}/auth/signup`, data);
};

export const login = async (data) => {
    return await axios.post(`${API_BASE_URL}/auth/login`, data);
};
