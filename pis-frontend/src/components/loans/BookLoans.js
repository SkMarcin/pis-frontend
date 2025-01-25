import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookLoans = () => {
    const { bookId } = useParams();
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        const fetchLoans = async () => {
            const response = await fetch(`http://localhost:80/api/loans-api/loans/book/${bookId}`);
            const data = await response.json();
            setLoans(data);
        };
        fetchLoans();
    }, [bookId]);

    return (
        <div className="dashboard-container">
            <h1>Book Loans</h1>
            <ul>
                {loans.map((loan) => (
                    <li key={loan.id}>
                        User ID: {loan.user_id}, From: {loan.date_from}, To: {loan.date_to}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookLoans;
