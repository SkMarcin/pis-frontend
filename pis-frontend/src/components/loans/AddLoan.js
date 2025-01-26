import React, { useEffect, useState } from "react";
import './AddLoan.css'

const AddLoan = () => {
    const [formData, setFormData] = useState({
        userId: "",
        bookId: "",
        dateFrom: "",
        dateTo: "",
    });
    const [message, setMessage] = useState("");
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredBooks, setFilteredBooks] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const queryParams = new URLSearchParams();
                if (searchTerm) {
                    queryParams.append("title", searchTerm);
                }
                const response = await fetch(`http://localhost:80/api/book-api/books/?${queryParams.toString()}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setBooks(data);
                setFilteredBooks(data); // Default to the full list
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        fetchBooks();
    }, [searchTerm]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const lowercased = e.target.value.toLowerCase();
        setFilteredBooks(
            books.filter((book) =>
                book.title.toLowerCase().includes(lowercased)
            )
        );
    };

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
            <h2 className="form-title">Add Loan</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="User ID"
                    value={formData.userId}
                    onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                    required
                    className="form-input"
                />
                <div className="book-select">
                    <input
                        type="text"
                        placeholder="Search for a book by title"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="form-input"
                    />
                    <ul className="book-list">
                        {filteredBooks.map((book) => (
                            <li
                                key={book.id}
                                onClick={() => setFormData({ ...formData, bookId: book.id })}
                                className={`book-item ${formData.bookId === book.id ? "selected" : ""}`}
                            >
                                {book.title}
                            </li>
                        ))}
                    </ul>
                </div>
                <input
                    type="date"
                    placeholder="Date From"
                    value={formData.dateFrom}
                    onChange={(e) => setFormData({ ...formData, dateFrom: e.target.value })}
                    required
                    className="form-input"
                />
                <input
                    type="date"
                    placeholder="Date To"
                    value={formData.dateTo}
                    onChange={(e) => setFormData({ ...formData, dateTo: e.target.value })}
                    required
                    className="form-input"
                />
                <button type="submit" className="form-submit-button">Add Loan</button>
            </form>
            {message && <p className="form-message">{message}</p>}
        </div>
    );
};

export default AddLoan;
