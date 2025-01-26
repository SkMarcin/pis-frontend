import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import '../styles.css'

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    if (!user) return <p>Log in to see options.</p>;

    return (
        <div>
            <h2>Hello, {user.email}</h2>
            <p>You role: {user.role}</p>
        </div>
    );
};

export default Dashboard;
