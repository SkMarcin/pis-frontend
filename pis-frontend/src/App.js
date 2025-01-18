import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navigation from "./Header";
import UsersPage from "./components/UsersPage";
import './styles.css'

const App = () => (
    <AuthProvider>
        <Router>
            <Navigation/>
            <Routes>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/users" element={<UsersPage/>}/>
            </Routes>
        </Router>
    </AuthProvider>
);

export default App;
