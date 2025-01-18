import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import '../styles.css';

const UsersPage = () => {
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/users');
            const data = await response.json();
            setUsers(data);
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter((u) => {
        if (user.role === "admin") return true;
        if (user.role === "librarian") return u.role === "reader";
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
        <div className="users-page">
            <h2>Zarządzanie Użytkownikami</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Imię</th>
                    <th>Email</th>
                    <th>Rola</th>
                    {user.role !== "reader" && <th>Akcje</th>}
                </tr>
                </thead>
                <tbody>
                {filteredUsers.map((u) => (
                    <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.role}</td>
                        {user.role !== "reader" && (
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
        </div>
    );
};

export default UsersPage;
