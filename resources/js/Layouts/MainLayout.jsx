import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from "@/hooks/useAuth";

const leftNavigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Todos', href: '/todos' },
    { name: 'Kategoriler', href: '/categories' },
];

const rightNavigation = [
    { name: 'Giriş Yap', href: '/login' },
    { name: 'Kaydol', href: '/register' },
];

const MainLayout = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { token, logout } = useAuth();

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
            {/* Navigation */}
            <nav className="bg-white dark:bg-gray-800 shadow">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        <div className="flex items-center">
                            <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white mr-8">
                                Todo App
                            </Link>
                            <div className="hidden sm:flex sm:space-x-8">
                                {leftNavigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                                            location.pathname === item.href
                                                ? 'border-b-2 border-indigo-500 text-gray-900 dark:text-white'
                                                : 'text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="hidden sm:flex sm:space-x-4">
                                {rightNavigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded ${
                                            location.pathname === item.href
                                                ? 'bg-indigo-500 text-white'
                                                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            {token && (
                                <button
                                    onClick={async () => {
                                        await logout();
                                        window.location.href = "/login";
                                    }}
                                    className="btn btn-secondary"
                                >
                                    Çıkış Yap
                                </button>
                            )}
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                            >
                                {isDarkMode ? '🌞' : '🌙'}
                            </button>
                            {/* Mobile menu button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="sm:hidden ml-2 p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                            >
                                {isMobileMenuOpen ? '✕' : '☰'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="sm:hidden">
                        <div className="space-y-1 pb-3 pt-2">
                            {[...leftNavigation, ...rightNavigation].map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`block py-2 pl-3 pr-4 text-base font-medium ${
                                        location.pathname === item.href
                                            ? 'bg-indigo-50 border-l-4 border-indigo-500 text-indigo-700 dark:bg-gray-700 dark:text-white'
                                            : 'text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default MainLayout; 