import React, { useState, useEffect } from 'react';
import './BooksPage.css';
import { Link } from 'react-router-dom';

const BooksList = () => {
    const [books, setBooks] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch('http://localhost:80/api/book-api/books/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setBooks(data))
            .catch((error) => console.error('Error fetching books:', error));
    }, [token]);

    return (
        <div className="books-list">
            <h1>Books List</h1>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        <Link to={`/books/${book.id}`}>{book.title}</Link>
                    </li>
                ))}
            </ul>
            <Link to="/books/create" className="create-link">Create a New Book</Link>
        </div>
    );
};

export default BooksList;