import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './UserLoans.css'

const UserLoans = () => {
    const { userId } = useParams();
    const [loans, setLoans] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await fetch(`http://localhost:80/api/loans-api/loans/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setLoans(data);
            } catch (error) {
                console.error('Error fetching loans:', error);
            }
        };
        fetchLoans();
    }, [userId]);

    return (
        <div className="user-loans-container">
            <h1 className="user-loans-title">User Loans</h1>
            {loans.length === 0 ? (
                <p className="empty-message">No loans found for this user.</p>
            ) : (
                <ul className="loans-list">
                    {loans.map((loan) => (
                        <li key={loan.loanId} className="loan-item">
                            <span className="loan-detail">
                                <strong>Book ID:</strong> {loan.book.bookId}
                            </span>
                            <span className="loan-detail">
                                <strong>From:</strong> {loan.dateFrom}
                            </span>
                            <span className="loan-detail">
                                <strong>To:</strong> {loan.dateTo}
                            </span>
                            <span className="loan-detail">
                                <strong>Returned:</strong>{' '}
                                {loan.returnDate ? loan.returnDate : 'Not Returned'}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserLoans;
