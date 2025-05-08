import React, { useEffect, useState } from "react";
import { getAllTodos, searchTodos } from "@/services/todoService";
import Pagination from "@/components/common/Pagination";

const TodoList = ({ filters = {}, page = 1, onPageChange }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        let response;
        if (filters.search && filters.search.trim() !== "") {
          response = await searchTodos(filters.search, page);
        } else {
          response = await getAllTodos({ ...filters, page });
        }
        if (response.status === 'success') {
          setTodos(response.data);
          setMeta(response.meta?.pagination || null);
        } else {
          setError('Failed to fetch todos');
        }
      } catch (err) {
        console.error('Error fetching todos:', err);
        setError(err.response?.data?.message || 'Failed to fetch todos');
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [filters, page]);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;
  if (!todos.length) return <div className="text-center py-4">No todos found</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Yapılacaklar Listen</h2>
      <ul className="space-y-2">
        {todos.map(todo => (
          <li key={todo.id} className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium">{todo.title}</span>
              <span className={`px-2 py-1 rounded text-sm ${
                todo.status === 'completed' ? 'bg-green-100 text-green-800' :
                todo.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {todo.status}
              </span>
            </div>
            {todo.description && (
              <p className="text-gray-600 mt-1">{todo.description}</p>
            )}
          </li>
        ))}
      </ul>
      {meta && onPageChange && (
        <Pagination
          currentPage={meta.current_page}
          totalPages={meta.last_page}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default TodoList;
