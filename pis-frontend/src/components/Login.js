import React, {useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/api';
import AuthContext from '../context/AuthContext';
import '../styles.css'

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const { user } = useContext(AuthContext);
    const { login: loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        try {
            const response = await login(formData);
            loginUser(response.data.token);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error.response?.data?.message || 'Unknown error');
            setErrorMessage(error.response?.data?.message || 'Błędny login lub hasło');
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
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <p><a href="/signup">Zarejestruj użytkownika</a></p>
        </form>
    );
};

export default Login;
