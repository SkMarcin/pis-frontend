import React, { useState } from "react";

const AddLoan = () => {
    const [formData, setFormData] = useState({
        userId: "",
        bookId: "",
        dateFrom: "",
        dateTo: "",
    });
    const [message, setMessage] = useState("");
    const token = localStorage.getItem("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:80/api/loans-api/loans", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setMessage("Loan added successfully!");
                setFormData({ userId: "", bookId: "", dateFrom: "", dateTo: "" });
            } else {
                setMessage("Failed to add loan.");
            }
        } catch (error) {
            setMessage("Error: " + error.message);
        }
    };

    return (
        <div className="form-container">
            <h2>Add Loan</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="User ID"
                    value={formData.userId}
                    onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Book ID"
                    value={formData.bookId}
                    onChange={(e) => setFormData({ ...formData, bookId: e.target.value })}
                    required
                />
                <input
                    type="date"
                    placeholder="Date From"
                    value={formData.dateFrom}
                    onChange={(e) => setFormData({ ...formData, dateFrom: e.target.value })}
                    required
                />
                <input
                    type="date"
                    placeholder="Date To"
                    value={formData.dateTo}
                    onChange={(e) => setFormData({ ...formData, dateTo: e.target.value })}
                    required
                />
                <button type="submit">Add Loan</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddLoan;
