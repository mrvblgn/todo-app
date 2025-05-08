import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Todos', href: '/todos' },
    { name: 'Categories', href: '/categories' },
];

export default function MainLayout({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const location = useLocation();

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
            <Disclosure as="nav" className="bg-white dark:bg-gray-800 shadow">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 justify-between">
                                <div className="flex">
                                    <div className="flex flex-shrink-0 items-center">
                                        <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
                                            Todo App
                                        </Link>
                                    </div>
                                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                        {navigation.map((item) => (
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
                                <div className="flex items-center">
                                    <button
                                        onClick={toggleTheme}
                                        className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                                    >
                                        {isDarkMode ? (
                                            <SunIcon className="h-6 w-6" />
                                        ) : (
                                            <MoonIcon className="h-6 w-6" />
                                        )}
                                    </button>
                                    <div className="-mr-2 flex items-center sm:hidden">
                                        <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white">
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 pb-3 pt-2">
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as={Link}
                                        to={item.href}
                                        className={`block py-2 pl-3 pr-4 text-base font-medium ${
                                            location.pathname === item.href
                                                ? 'bg-indigo-50 border-l-4 border-indigo-500 text-indigo-700 dark:bg-gray-700 dark:text-white'
                                                : 'text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                                        }`}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>

            <main className="py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
} 