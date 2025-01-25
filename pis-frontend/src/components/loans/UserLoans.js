import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserLoans = () => {
    const { userId } = useParams();
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        const fetchLoans = async () => {
            const response = await fetch(`http://localhost:8007/api/loans/user/${userId}`);
            const data = await response.json();
            setLoans(data);
        };
        fetchLoans();
    }, [userId]);

    return (
        <div className="dashboard-container">
            <h1>User Loans</h1>
            <ul>
                {loans.map((loan) => (
                    <li key={loan.id}>
                        Book ID: {loan.book_id}, From: {loan.date_from}, To: {loan.date_to}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserLoans;
