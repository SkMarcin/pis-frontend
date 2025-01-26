import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './AllLoans.css'

const AllLoans = () => {
    const [loans, setLoans] = useState([]);
    const [filteredLoans, setFilteredLoans] = useState([]);
    const [bookId, setBookId] = useState('');
    const [userId, setUserId] = useState('');
    const [returnStatus, setReturnStatus] = useState('all');
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch('http://localhost:80/api/loans-api/loans', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setLoans(data);
                setFilteredLoans(data);
            })
            .catch((error) => console.error('Error fetching loans:', error));
    }, [token]);

    useEffect(() => {
        let filtered = loans.filter(loan =>
            (bookId === '' || loan.book.bookId.toString().includes(bookId)) &&
            (userId === '' || loan.user.userId.toString().includes(userId)) &&
            (returnStatus === 'all' || (returnStatus === 'returned' && loan.returnDate) || (returnStatus === 'not_returned' && !loan.returnDate))
        );
        setFilteredLoans(filtered);
    }, [bookId, userId, returnStatus, loans]);

    const handleReturnBook = async (bookId) => {
        try {
            const response = await fetch(`http://localhost:80/api/loans-api/return/${bookId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                // Update the loans list to reflect the returned status
                setLoans((prevLoans) =>
                    prevLoans.map((loan) =>
                        loan.book.bookId === bookId
                            ? { ...loan, returnDate: new Date().toISOString().split("T")[0] }
                            : loan
                    )
                );
            } else {
                console.error(`Failed to return book. Status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error returning book:", error);
        }
    };

    return (
        <div className="loans-dashboard-container">
            <h1 className="loans-dashboard-title">All Loans</h1>
            <div className="filters-container">
                <input
                    type="text"
                    placeholder="Search by Book ID"
                    value={bookId}
                    onChange={(e) => setBookId(e.target.value)}
                    className="filter-input"
                />
                <input
                    type="text"
                    placeholder="Search by User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="filter-input"
                />
                <select
                    value={returnStatus}
                    onChange={(e) => setReturnStatus(e.target.value)}
                    className="filter-select"
                >
                    <option value="all">All</option>
                    <option value="returned">Returned</option>
                    <option value="not_returned">Not Returned</option>
                </select>
            </div>
            <div className="table-wrapper">
                <table className="loans-table">
                    <thead>
                    <tr>
                        <th>Loan ID</th>
                        <th>User ID</th>
                        <th>Book ID</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Returned</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredLoans.map((loan) => (
                        <tr key={loan.loanId}>
                            <td>{loan.loanId}</td>
                            {/* Clickable User ID linking to /loans/user-loans/:userId */}
                            <td>
                                <Link to={`/loans/user-loans/${loan.user.userId}`} className="link">
                                    {loan.user.userId}
                                </Link>
                            </td>
                            {/* Clickable Book ID linking to /loans/book-loans/:bookId */}
                            <td>{loan.book.bookId}</td>
                            <td>{loan.dateFrom}</td>
                            <td>{loan.dateTo}</td>
                            <td>{loan.returnDate ? loan.returnDate : (
                                <button
                                    className="return-button"
                                    onClick={() => handleReturnBook(loan.book.bookId)}
                                >
                                    Return
                                </button>
                            )}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="add-loan-button-container">
                <Link to="/loans/add-loan" className="add-loan-button">
                    Add New Loan
                </Link>
            </div>
        </div>
    );
};

export default AllLoans;
