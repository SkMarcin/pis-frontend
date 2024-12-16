import React, { useState } from 'react';
import { signup } from '../utils/api';

const Signup = () => {
    const [formData, setFormData] = useState({ email: '', password: '', role: '' });
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
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
            />
            <input
                type="text"
                placeholder="Role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
            />
            <button type="submit">Sign Up</button>
            <p>{message}</p>
        </form>
    );
};

export default Signup;
