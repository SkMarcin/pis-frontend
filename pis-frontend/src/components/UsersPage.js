import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import './users.css';
import {useNavigate} from "react-router-dom";

const UsersPage = () => {
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/users');
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                console.error("Error fetching users:");
                setError("Nie udało się załadować użytkowników.");
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter((u) => {
        if (user.role === "Admin") return true;
        if (user.role === "Librarian") return u.role === "Reader";
        return false;
    });

    const handleDelete = async (userId) => {
        try {
            await fetch(`/api/users/${userId}`, {
                method: 'DELETE',
            });
            setUsers(users.filter((u) => u.id !== userId));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="dashboard-container users-page">
            <h2>Zarządzanie Użytkownikami</h2>
            <button
                onClick={() => navigate('/users/add')}
                className="nav-btn"
            >
                Dodaj użytkownika
            </button>
            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Imię</th>
                        <th>Email</th>
                        <th>Rola</th>
                        {user.role !== "Reader" && <th>Akcje</th>}
                    </tr>
                    </thead>
                    <tbody>
                    {filteredUsers.map((u) => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                            {user.role !== "Reader" && (
                                <td>
                                    <button
                                        onClick={() => handleDelete(u.id)}
                                        className="delete-btn"
                                    >
                                        Usuń
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );

};

export default UsersPage;
