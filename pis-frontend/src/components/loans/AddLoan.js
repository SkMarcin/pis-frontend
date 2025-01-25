import React, { useState } from "react";

const AddLoan = () => {
    const [formData, setFormData] = useState({
        user_id: "",
        book_id: "",
        date_from: "",
        date_to: "",
    });
    const [message, setMessage] = useState("");
    const token = localStorage.getItem("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8007/api/loans", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setMessage("Loan added successfully!");
                setFormData({ user_id: "", book_id: "", date_from: "", date_to: "" });
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
                    value={formData.user_id}
                    onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Book ID"
                    value={formData.book_id}
                    onChange={(e) => setFormData({ ...formData, book_id: e.target.value })}
                    required
                />
                <input
                    type="date"
                    placeholder="Date From"
                    value={formData.date_from}
                    onChange={(e) => setFormData({ ...formData, date_from: e.target.value })}
                    required
                />
                <input
                    type="date"
                    placeholder="Date To"
                    value={formData.date_to}
                    onChange={(e) => setFormData({ ...formData, date_to: e.target.value })}
                    required
                />
                <button type="submit">Add Loan</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddLoan;
