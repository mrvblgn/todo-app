import React from 'react';

export default function Card({ children, className = '' }) {
    return (
        <div className={`bg-white dark:bg-gray-800 shadow rounded-lg ${className}`}>
            {children}
        </div>
    );
}

Card.Header = function CardHeader({ children, className = '' }) {
    return (
        <div className={`px-6 py-4 border-b border-gray-200 dark:border-gray-700 ${className}`}>
            {children}
        </div>
    );
};

Card.Body = function CardBody({ children, className = '' }) {
    return (
        <div className={`px-6 py-4 ${className}`}>
            {children}
        </div>
    );
};

Card.Footer = function CardFooter({ children, className = '' }) {
    return (
        <div className={`px-6 py-4 border-t border-gray-200 dark:border-gray-700 ${className}`}>
            {children}
        </div>
    );
};