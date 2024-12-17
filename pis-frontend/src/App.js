import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './styles.css'

const App = () => (
    <AuthProvider>
        <Router>
            <header>System Biblioteczny</header>
            <nav>
                <button onClick={() => alert('Użytkownicy link not implemented yet')}>
                    Użytkownicy
                </button>
                <button onClick={() => alert('Wypożyczenia link not implemented yet')}>
                    Wypożyczenia
                </button>
                <button onClick={() => alert('Rezerwacje link not implemented yet')}>
                    Rezerwacje
                </button>
                <button onClick={() => alert('Księgozbiór link not implemented yet')}>
                    Księgozbiór
                </button>
            </nav>
            <Routes>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
        </Router>
    </AuthProvider>
);

export default App;
