import React, { useEffect, useState } from "react";

const AllLoans = () => {
    const [loans, setLoans] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch('http://localhost:80/api/loans-api/loans', {
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
                    {loans.map((loan) => (
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
