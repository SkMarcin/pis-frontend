import React, { useState } from 'react';
import { signup } from '../utils/api';
import '../styles.css'

const Signup = () => {
    const [formData, setFormData] = useState({ email: '', password: '', role: 'READER' });
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(formData);
            setMessage('Signup successful! You can now log in.');
        } catch (error) {
            setMessage('Signup failed: ' + error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2>Podaj dane konta</h2>
            <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
            />
            <select
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                required
            >
                <option value="READER">Reader</option>
                <option value="LIBRARIAN">Librarian</option>
                <option value="ADMIN">Admin</option>
            </select>
            <button type="submit">Register</button>
            <p>{message}</p>
        </form>
    );
};

export default Signup;
