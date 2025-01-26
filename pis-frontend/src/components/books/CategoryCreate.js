import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './CategoryCreate.css';

const CategoryCreate = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const newCategory = { name, description };

        fetch('http://localhost:80/api/book-api/categories/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newCategory),
        })
            .then((response) => {
                if (response.ok) {
                    navigate('/categories'); // Przejście do listy kategorii po poprawnym dodaniu
                } else {
                    response.json().then((data) => {
                        setError(data.detail || 'Failed to add category');
                    });
                }
            })
            .catch((error) => {
                console.error('Error adding category:', error);
                setError('An error occurred while adding the category. Please try again.');
            });
    };

    return (
        <div className="add-category-container">
            <h1>Add New Category</h1>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Category Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter category name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Category Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter category description"
                        rows="4"
                        required
                    ></textarea>
                </div>
                <div className="form-actions">
                    <Link to="/categories" className="return-button">
                        Return to Categories
                    </Link>
                    <button type="submit" className="add-button">
                        Add Category
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CategoryCreate;
