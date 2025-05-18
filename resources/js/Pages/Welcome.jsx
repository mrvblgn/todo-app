import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4 dark:text-white">Todo Uygulamasına Hoş Geldiniz</h1>
            <Link 
                to="/dashboard" 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Dashboard' a Git
            </Link>
        </div>
    );
};

export default Welcome; 