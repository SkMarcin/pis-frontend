import React, { useState, useEffect, useContext } from 'react';
import './BookList.css';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const BooksList = () => {
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [filters, setFilters] = useState({ title: '', categoryId: '', authorId: '' });
    const token = localStorage.getItem('token');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch('http://localhost:80/api/book-api/categories/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error('Error fetching categories:', error));

        fetch('http://localhost:80/api/book-api/writers/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setAuthors(data))
            .catch((error) => console.error('Error fetching authors:', error));
    }, [token]);

    useEffect(() => {
        const queryParams = new URLSearchParams(filters);
        fetch(`http://localhost:80/api/book-api/books/?${queryParams.toString()}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setBooks(data))
            .catch((error) => console.error('Error fetching books:', error));
    }, [filters, token]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    const handleDelete = (bookId) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            fetch(`http://localhost:80/api/book-api/books/${bookId}/`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    if (response.ok) {
                        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
                    } else {
                        console.error('Failed to delete book');
                    }
                })
                .catch((error) => console.error('Error deleting book:', error));
        }
    };

    return (
        <div className="books-list-container">
            <h1>Books List</h1>

            {user && (user.role === 'ADMIN' || user.role === 'LIBRARIAN') && (
                <Link to="/books/create" className="create-link">Create a New Book</Link>
            )}

            <div className="filters">
                <input
                    type="text"
                    name="title"
                    placeholder="Search by title"
                    value={filters.title}
                    onChange={handleFilterChange}
                    className="filter-input"
                />

                <select
                    name="categoryId"
                    value={filters.categoryId}
                    onChange={handleFilterChange}
                    className="filter-select"
                >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <select
                    name="authorId"
                    value={filters.authorId}
                    onChange={handleFilterChange}
                    className="filter-select"
                >
                    <option value="">All Authors</option>
                    {authors.map((author) => (
                        <option key={author.id} value={author.id}>
                            {author.name} {author.lastName}
                        </option>
                    ))}
                </select>
            </div>

            <table className="books-table">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {books.map((book) => (
                    <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.category.name}</td>
                        <td>
                            <Link to={`/books/${book.id}`} className="details-link">Details</Link>
                            {user && (user.role === 'ADMIN' || user.role === 'LIBRARIAN') && (
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(book.id)}
                                >
                                    Delete
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default BooksList;