import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Axios ile API isteği örneği
        window.axios.get('/api/todos')
            .then(response => {
                setTodos(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching todos:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
                <div className="bg-white rounded-lg shadow p-6">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Your Todos</h2>
                            {todos.length > 0 ? (
                                <ul className="space-y-2">
                                    {todos.map(todo => (
                                        <li key={todo.id} className="p-2 bg-gray-50 rounded">
                                            {todo.title}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-600">No todos found.</p>
                            )}
                        </div>
                    )}
                    <Link 
                        to="/" 
                        className="inline-block mt-4 text-blue-500 hover:text-blue-700"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
