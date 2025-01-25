import React from "react";
import { useParams } from "react-router-dom";

const ReturnBook = () => {
    const { bookId } = useParams();
    const [message, setMessage] = React.useState("");

    const handleReturn = async () => {
        try {
            const response = await fetch(`http://localhost:80/api/loans-api/return/${bookId}`, {
                method: "POST",
            });
            if (response.ok) {
                setMessage("Book returned successfully!");
            } else {
                setMessage("Failed to return the book.");
            }
        } catch (error) {
            setMessage("Error: " + error.message);
        }
    };

    return (
        <div className="dashboard-container">
            <h1>Return Book</h1>
            <button onClick={handleReturn}>Return Book</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ReturnBook;
