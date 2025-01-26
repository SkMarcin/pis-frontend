import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import './users.css';
import {useNavigate} from "react-router-dom";

const UsersPage = () => {
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:80/api/users-management/users/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    if (!data || data.length === 0) {
                        console.warn("No loans found for the given Book ID.");
                        setUsers({}); // Set to an empty array if no data is found
                    } else {
                        setUsers(data); // Set the loans if data is valid
                    }
                } else {
                    setError("Failed to load users.");
                }
            } catch (err) {
                setError("Error fetching users.");
            }
        };

        fetchUsers();
    }, [token]);

    const handleDelete = async (userId) => {
        try {
            const response = await fetch(`http://localhost:80/api/users-management/users/${userId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setUsers(users.filter((u) => u.id !== userId));
            } else {
                console.error("Failed to delete user.");
            }
        } catch (err) {
            console.error("Error deleting user:", err);
        }
    };

    const filteredUsers = users.filter((u) => {
        if (user.role === "ADMIN") return true;
        if (user.role === "LIBRARIAN") return u.role === "READER";
        return false;
    });

    return (
        <div className="dashboard-container users-page">
            <h2>User Management</h2>

            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>PESEL</th>
                        {user.role !== "READER" && <th>Actions</th>}
                    </tr>
                    </thead>
                    <tbody>
                    {filteredUsers.map((u) => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.email}</td>
                            <td>{u.first_name}</td>
                            <td>{u.last_name}</td>
                            <td>{u.pesel}</td>
                            {user.role !== "READER" && (
                                <td>
                                    <button
                                        onClick={() => handleDelete(u.id)}
                                        className="delete-btn"
                                    >
                                        Delete
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

