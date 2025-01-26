import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './CreateAuthor.css';

const CreateAuthor = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const newAuthor = { name, lastName };

        fetch('http://localhost:80/api/book-api/writers/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newAuthor),
        })
            .then((response) => {
                if (response.ok) {
                    navigate('/authors'); // Przejście do listy autorów po poprawnym dodaniu
                } else {
                    response.json().then((data) => {
                        setError(data.detail || 'Failed to add author');
                    });
                }
            })
            .catch((error) => {
                console.error('Error adding author:', error);
                setError('An error occurred while adding the author. Please try again.');
            });
    };

    return (
        <div className="create-author-container">
            <h1>Add New Author</h1>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">First Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter author's first name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter author's last name"
                        required
                    />
                </div>
                <div className="form-actions">
                    <Link to="/authors" className="return-button">
                        Return to Authors
                    </Link>
                    <button type="submit" className="add-button">
                        Add Author
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateAuthor;
