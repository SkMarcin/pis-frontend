import './AuthorList.css';
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const AuthorsList = () => {
    const [authors, setAuthors] = useState([]);
    const token = localStorage.getItem('token');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch('http://localhost:80/api/book-api/writers/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setAuthors(data))
            .catch((error) => console.error('Error fetching authors:', error));
    }, [token]);

    const handleDelete = (authorId) => {
        if (window.confirm('Are you sure you want to delete this author?')) {
            fetch(`http://localhost:80/api/book-api/writers/${authorId}/`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    if (response.ok) {
                        // Po pomyślnym usunięciu autora usuwamy go z lokalnego stanu
                        setAuthors((prevAuthors) =>
                            prevAuthors.filter((author) => author.id !== authorId)
                        );
                    } else if (response.status === 409) {
                        window.alert(
                            'This author cannot be deleted because they are assigned to books. Please remove the books associated with this author first.'
                        );
                    } else {
                        console.error('Failed to delete author');
                    }
                })
                .catch((error) => {
                    console.error('Error deleting author:', error);
                    window.alert('An error occurred while trying to delete the author.');
                });
        }
    };

    return (
        <div className="authors-list-container">
            <h1>Authors List</h1>

            <Link to="/books" className="return-button">Return to books</Link>

            {user && (user.role === 'ADMIN' || user.role === 'LIBRARIAN') && (
                <Link to="/authors/create" className="create-link">Create a New Author</Link>
            )}

            <table className="authors-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Last name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {authors.map((author) => (
                    <tr key={author.id}>
                        <td>{author.name}</td>
                        <td>{author.lastName}</td>
                        <td>
                            {user && (user.role === 'ADMIN' || user.role === 'LIBRARIAN') && (
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(author.id)}
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

export default AuthorsList;
