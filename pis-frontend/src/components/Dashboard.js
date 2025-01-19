import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import '../styles.css'

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    if (!user) return <p>Zaloguj się, żeby wyświetlić opcje.</p>;

    return (
        <div>
            <h2>Witaj, {user.email}</h2>
            <p>Twoja rola: {user.role}</p>
        </div>
    );
};

export default Dashboard;
