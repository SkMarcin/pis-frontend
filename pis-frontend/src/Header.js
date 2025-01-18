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
                    <h1>System Biblioteczny</h1>
                </Link>
            </div>
            <div className="nav-buttons-container">
                <div className="nav-buttons">
                    {user ? (
                        <>
                        {user.role !== "czytelnik" && (
                            <Link to="/users" className="nav-btn">Użytkownicy</Link>
                        )}
                        <Link to="/wypozyczenia" className="nav-btn">Wypożyczenia</Link>
                        <Link to="/ksiegozbior" className="nav-btn">Księgozbiór</Link>
                        </>
                    ) : null}
                </div>
                <div className="nav-auth">
                    {user ? (
                        <button onClick={logout} className="nav-btn logout-btn">Wyloguj</button>
                    ) : (
                        location.pathname !== "/login" && (
                            <Link to="/login" className="nav-btn login-btn">Zaloguj się</Link>
                        )
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navigation;