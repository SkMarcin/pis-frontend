import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/api';
import AuthContext from '../context/AuthContext';
import '../styles.css'

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login: loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(formData);
            loginUser(response.data.token);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
            />
            <input
                type="password"
                placeholder="Hasło"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
            />
            <button type="submit">Zaloguj</button>
            <p><a href="/signup">Zarejestruj użytkownika</a></p>
        </form>
    );
};

export default Login;
