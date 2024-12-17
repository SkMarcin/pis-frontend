import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import '../styles.css'

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    if (!user) return <p>Please log in to view the dashboard.</p>;

    return (
        <div>
            <h1>Welcome, {user.email}</h1>
            <p>Your role: {user.role}</p>
        </div>
    );
};

export default Dashboard;
