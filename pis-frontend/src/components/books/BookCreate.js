import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookCreate.css';

const BookCreate = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const newBook = {
            title,
            description,
            categoryId: selectedCategory,
            authorIds: selectedAuthors,
        };

        fetch('http://localhost:80/api/book-api/books/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newBook),
        })
            .then((response) => response.json())
            .then((data) => {
                navigate(`/books/${data.id}`);
            })
            .catch((error) => console.error('Error creating book:', error));
    };

    const handleAuthorChange = (id) => {
        setSelectedAuthors((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((authorId) => authorId !== id)
                : [...prevSelected, id]
        );
    };

    return (
        <form className="create-book-form" onSubmit={handleSubmit}>
            <h2>Create New Book</h2>

            <label htmlFor="title">Title</label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <label htmlFor="description">Description</label>
            <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            ></textarea>

            <label htmlFor="category">Category</label>
            <select
                id="category"
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(Number(e.target.value))}
                required
            >
                <option value="" disabled>
                    Select a category
                </option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>

            <fieldset>
                <legend>Authors</legend>
                <div className="author-container">
                    <div className="author-checkbox-container">
                        {authors.map((author) => (
                            <div key={author.id}>
                                <input
                                    type="checkbox"
                                    id={`author-${author.id}`}
                                    value={author.id}
                                    onChange={() => handleAuthorChange(author.id)}
                                />
                                <label htmlFor={`author-${author.id}`}>
                                    {author.name} {author.lastName}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </fieldset>

            <button type="submit">Create Book</button>
        </form>
    );
};

export default BookCreate;
