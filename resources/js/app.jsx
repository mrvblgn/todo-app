import '../css/app.css';
import './bootstrap';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import CategoryPage from './pages/CategoryPage';
import TodoPage from './pages/TodoPage';
import CreateTodoPage from './pages/CreateTodoPage';

const App = () => {
    return (
        <MainLayout>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/categories" element={<CategoryPage />} />
                <Route path="/todos" element={<TodoPage />} />
                <Route path="/create-todo" element={<CreateTodoPage />} />
            </Routes>
        </MainLayout>
    );
};

export default App;