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
        <form onSubmit={handleSubmit} className="form-container">
            <h2>Dodaj Użytkownika</h2>
            <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
            />
            <input
                type="password"
                placeholder="Hasło"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
            />
            <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
            >
                <option value="Reader">Czytelnik</option>
                {user.role === "Admin" && <option value="Librarian">Bibliotekarz</option>}
                {user.role === "Admin" && <option value="Admin">Admin</option>}
            </select>
            <button type="submit">Dodaj użytkownika</button>
        </form>
    );

};

export default AddUser;
