import '../css/app.css';
import './bootstrap';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Welcome from './Pages/Welcome';
import Dashboard from './Pages/Dashboard';
import TodoList from './Pages/TodoList';
import TodoForm from './Pages/TodoForm';
import CategoryList from './Pages/CategoryList';

export default function App() {
    return (
        <MainLayout>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/todos" element={<TodoList />} />
                <Route path="/todos/create" element={<TodoForm />} />
                <Route path="/todos/:id/edit" element={<TodoForm />} />
                <Route path="/categories" element={<CategoryList />} />
            </Routes>
        </MainLayout>
    );
}