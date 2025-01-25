import React, { useEffect, useState } from "react";

const AllLoans = () => {
    const [loans, setLoans] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch('http://book-rent-api:/api/loans', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setLoans(data))
            .catch((error) => console.error('Error fetching loans:', error));
    }, [token]);

    return (
        <div className="dashboard-container">
            <h1>All Loans</h1>
            <ul>
                {loans.map((loan) => (
                    <li key={loan.id}>
                        User ID: {loan.user_id}, Book ID: {loan.book_id}, From: {loan.date_from}, To: {loan.date_to}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllLoans;
