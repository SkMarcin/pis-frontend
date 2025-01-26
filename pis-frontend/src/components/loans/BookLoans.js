import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookLoans = () => {
    const { bookId } = useParams();
    const [loans, setLoans] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await fetch(`http://localhost:80/api/loans-api/loans/book/${bookId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    console.error(`Error: ${response.status} ${response.statusText}`);
                    setLoans({}); // Ensure loans is an empty array if there's an error
                    return;
                }

                const data = await response.json();

                // Handle cases where the response is null or invalid
                if (!data || data.length === 0) {
                    console.warn("No loans found for the given Book ID.");
                    setLoans({}); // Set to an empty array if no data is found
                } else {
                    setLoans(data); // Set the loans if data is valid
                }
            } catch (error) {
                console.error("Error fetching loans:", error);
                setLoans({});
            }
        };
        fetchLoans();
    }, [bookId]);

    return (
        <div className="book-loans-container">
            <h1 className="book-loans-title">Book Loans</h1>
            {loans.length === 0 ? (
                <p className="empty-message">No loans found for this book.</p>
            ) : (
                <ul className="loans-list">
                    {loans.map((loan) => (
                        <li key={loan.loanId} className="loan-item">
                            <span className="loan-detail">
                                <strong>User ID:</strong> {loan.user.userId}
                            </span>
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
                                <strong>Returned:</strong> {loan.returnDate ? loan.returnDate : "Not returned"}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BookLoans;
