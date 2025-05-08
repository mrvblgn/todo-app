import '../css/app.css';
import './bootstrap';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';

const App = () => {
    return (
        <MainLayout>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </MainLayout>
    );
};

export default App;