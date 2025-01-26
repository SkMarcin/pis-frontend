import React, {useContext, useState} from 'react';
import AuthContext from "../../context/AuthContext";
import './users.css'

const AddUser = () => {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "READER", // Default role
    });
    const [message, setMessage] = useState("");
    const token = localStorage.getItem("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:80/api/users-management/users/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const createdUser = await response.json();
                setMessage(`User added successfully! ID: ${createdUser.id}`);
                setFormData({ email: "", password: "", role: "READER" });
            } else {
                setMessage(`Failed to add user: ${response.statusText}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className="form-container">
            <h2>Add User</h2>
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
                <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    required
                >
                    <option value="READER">Reader</option>
                    {user.role === "ADMIN" && <option value="LIBRARIAN">Librarian</option>}
                    {user.role === "ADMIN" && <option value="ADMIN">Admin</option>}
                </select>
                <button type="submit">Add User</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddUser;

