import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './BooksPage.css';

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch(`http://localhost:80/api/book-api/books/${id}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setBook(data))
            .catch((error) => console.error('Error fetching book details:', error));
    }, [id, token]);

    if (!book) return <div>Loading...</div>;

    return (
        <div className="book-details">
            <h2>{book.title}</h2>
            <p>{book.description}</p>
            <p>Category: {book.category.name}</p>
            <h3>Authors:</h3>
            <ul>
                {book.authors.map((author) => (
                    <li key={author.id}>
                        <Link to={`/authors/${author.id}`}>{author.name} {author.lastName}</Link>
                    </li>
                ))}
            </ul>
            <Link to="/" className="back-link">Back to List</Link>
        </div>
    );
};

export default BookDetails;