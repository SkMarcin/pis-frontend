import './CategoryList.css';
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const CategoriesList = () => {
    const [categories, setCategories] = useState([]);
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
    }, [token]);

    const handleDelete = (categoryId) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            fetch(`http://localhost:80/api/book-api/categories/${categoryId}/`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    if (response.ok) {
                        // Po pomyślnym usunięciu kategorii usuwamy ją z lokalnego stanu
                        setCategories((prevCategories) =>
                            prevCategories.filter((category) => category.id !== categoryId)
                        );
                    } else if (response.status === 409) {
                        window.alert(
                            'This category cannot be deleted because it is being used in books. Please remove the books associated with this category first.'
                        );
                    } else {
                        console.error('Failed to delete category');
                    }
                })
                .catch((error) => {
                    console.error('Error deleting category:', error);
                    window.alert('An error occurred while trying to delete the category.');
                });
        }
    };

    return (
        <div className="categories-list-container">
            <h1>Categories List</h1>

            <Link to="/books" className="return-button">Return to books</Link>

            {user && (user.role === 'ADMIN' || user.role === 'LIBRARIAN') && (
                <Link to="/categories/create" className="create-link">Create a New Category</Link>
            )}

            <table className="categories-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((category) => (
                    <tr key={category.id}>
                        <td>{category.name}</td>
                        <td>{category.description}</td>
                        <td>
                            {user && (user.role === 'ADMIN' || user.role === 'LIBRARIAN') && (
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(category.id)}
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

export default CategoriesList;


