import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navigation from "./Header";
import UsersPage from "./components/users/UsersPage";
import AddUser from "./components/users/AddUser";
import NotFound from "./components/NotFound";
import BooksList from "./components/books/BookList";
import BookDetails from "./components/books/BookDetails";
import BookCreate from "./components/books/BookCreate";

import AddLoan from "./components/loans/AddLoan";
import UserLoans from "./components/loans/UserLoans";
import AllLoans from "./components/loans/AllLoans";
import BookLoans from "./components/loans/BookLoans";
import ReturnBook from "./components/loans/ReturnBook";
import Loans from "./components/loans/Loans"
import './styles.css'
import CategoriesList from "./components/books/CategoryList";
import AuthorsList from "./components/books/AuthorList";
import CategoryCreate from "./components/books/CategoryCreate";
import CreateAuthor from "./components/books/CreateAuthor";
import { Navigate } from 'react-router-dom';

const App = () => (
    <AuthProvider>
        <Router>
            <Navigation/>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/users" element={<UsersPage/>}/>
                <Route path="/users/add" element={<AddUser />} />
                <Route path="/books" element={<BooksList />} />
                <Route path="/books/:id" element={<BookDetails />} />
                <Route path="/books/create" element={<BookCreate />} />
                <Route path="/categories" element={<CategoriesList />} />
                <Route path="/authors" element={<AuthorsList />} />
                <Route path="/categories/create" element={<CategoryCreate />} />
                <Route path="/authors/create" element={<CreateAuthor />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/loans" element={<Loans />} />
                <Route path="/loans/add-loan" element={<AddLoan />} />
                <Route path="/loans/user-loans/:userId" element={<UserLoans />} />
                <Route path="/loans/all-loans" element={<AllLoans />} />
                <Route path="/loans/book-loans/:bookId" element={<BookLoans />} />
                <Route path="/loans/return-book/:bookId" element={<ReturnBook />} />
            </Routes>
        </Router>
    </AuthProvider>
);

export default App;
