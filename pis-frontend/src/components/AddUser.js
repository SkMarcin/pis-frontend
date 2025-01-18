import React, { useState } from 'react';

const AddUser = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'Reader', // Default role
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8180/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error(`Nie udało się dodać użytkownika: ${response.statusText}`);
            }
            alert('User added successfully!');
            setFormData({ email: '', password: '', role: 'Reader' });
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <h2>Add User</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Hasło:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Role:
                    <select name="role" value={formData.role} onChange={handleChange}>
                        <option value="Reader">Czytelnik</option>
                        <option value="Librarian">Bibliotekarz</option>
                        <option value="Admin">Admin</option>
                    </select>
                </label>
                <br />
                <button type="submit">Dodaj użytkownika</button>
            </form>
        </div>
    );
};

export default AddUser;
