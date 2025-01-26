import React, { useEffect, useState } from "react";

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

    return (
        <div className="dashboard-container">
            <h1>All Loans</h1>
            <div className="filters mb-4">
                <input type="text" placeholder="Search by Book ID" value={bookId} onChange={(e) => setBookId(e.target.value)} className="border p-2 mr-2" />
                <input type="text" placeholder="Search by User ID" value={userId} onChange={(e) => setUserId(e.target.value)} className="border p-2 mr-2" />
                <select value={returnStatus} onChange={(e) => setReturnStatus(e.target.value)} className="border p-2">
                    <option value="all">All</option>
                    <option value="returned">Returned</option>
                    <option value="not_returned">Not Returned</option>
                </select>
            </div>
            <table className="min-w-full border border-collapse border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Loan ID</th>
                        <th className="border p-2">User ID</th>
                        <th className="border p-2">Book ID</th>
                        <th className="border p-2">From</th>
                        <th className="border p-2">To</th>
                        <th className="border p-2">Returned</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLoans.map((loan) => (
                        <tr key={loan.loanId} className="text-center">
                            <td className="border p-2">{loan.loanId}</td>
                            <td className="border p-2">{loan.user.userId}</td>
                            <td className="border p-2">{loan.book.bookId}</td>
                            <td className="border p-2">{loan.dateFrom}</td>
                            <td className="border p-2">{loan.dateTo}</td>
                            <td className="border p-2">{loan.returnDate ? loan.returnDate : 'Not returned'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllLoans;
