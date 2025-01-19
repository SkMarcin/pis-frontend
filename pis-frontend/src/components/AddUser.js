import React, {useContext, useState} from 'react';
import AuthContext from "../context/AuthContext";
import './users.css'

const AddUser = () => {
    const { user } = useContext(AuthContext);
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
        const response = await fetch('http://localhost:8180/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            alert('Użytkownik dodany pomyślnie!');
            setFormData({ email: '', password: '', role: 'Reader' });
        } else {
            alert(`Nie udało się dodać użytkownika: ${response.statusText}`);
        }
    };

    return (
        <div>
            <h2>Add User</h2>
            <form onSubmit={handleSubmit} className="form-container">
                <h2>Dodaj użytkownika</h2>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    placeholder="Hasło"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <select name="role" value={formData.role} onChange={handleChange} required>
                    <option value="Reader">Czytelnik</option>
                    {user.role === "Admin" && (
                        <>
                            <option value="Librarian">Bibliotekarz</option>
                            <option value="Admin">Admin</option>
                        </>
                    )}
                </select>
                <button type="submit">Dodaj użytkownika</button>
            </form>

        </div>
    );
};

export default AddUser;
