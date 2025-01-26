import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import './styles.css'

const Navigation = () => {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();

    return (
        <nav className="navigation">
            <div className="nav-header">
                <Link to="/dashboard" className="header-link">
                    <h1>Library system</h1>
                </Link>
            </div>
            <div className="nav-buttons-container">
                <div className="nav-buttons">
                    {user ? (
                        <>
                        {user.role !== "READER" && (
                            <Link to="/users" className="nav-btn">Users</Link>
                        )}
                        <Link to="/loans/all-loans" className="nav-btn">Loans</Link>
                        <Link to="/books" className="nav-btn">Books</Link>
                        </>
                    ) : null}
                </div>
                <div className="nav-auth">
                    {user ? (
                        <button onClick={logout} className="nav-btn logout-btn">Log out</button>
                    ) : (
                        location.pathname !== "/login" && (
                            <Link to="/login" className="nav-btn login-btn">Log in</Link>
                        )
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navigation;