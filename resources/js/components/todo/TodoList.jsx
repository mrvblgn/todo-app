import React, { useEffect, useState } from "react";
import { getAllTodos, searchTodos, deleteTodo } from "@/services/todoService";
import Pagination from "@/components/common/Pagination";
import TodoItem from "@/components/todo/TodoItem";
import TodoForm from "@/components/todo/TodoForm";

const TodoList = ({ filters = {}, page = 1, onPageChange }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState(null);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [editTodo, setEditTodo] = useState(null);

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

  // Silme işlemi
  const handleDelete = async (id) => {
    if (!window.confirm("Bu todo silinsin mi?")) return;
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      alert("Todo silinemedi!");
    }
  };

  // Düzenleme işlemi (modal aç/kapat)
  const handleEdit = (todo) => {
    setEditTodo(todo);
  };

  // Düzenleme formu submit edildiğinde
  const handleEditSuccess = (updatedTodo) => {
    setTodos(todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo));
    setEditTodo(null);
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;
  if (!todos.length) return <div className="text-center py-4">No todos found</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Yapılacaklar Listen</h2>
      <ul className="space-y-2">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      {meta && onPageChange && (
        <Pagination
          currentPage={meta.current_page}
          totalPages={meta.last_page}
          onPageChange={onPageChange}
        />
      )}

      {/* Detay modalı */}
      {selectedTodo && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
              onClick={() => setSelectedTodo(null)}
              title="Kapat"
            >×</button>
            <TodoItem todo={selectedTodo} />
          </div>
        </div>
      )}

      {/* Düzenleme modalı */}
      {editTodo && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
              onClick={() => setEditTodo(null)}
              title="Kapat"
            >×</button>
            <TodoForm
              initialData={editTodo}
              onSuccess={handleEditSuccess}
              onCancel={() => setEditTodo(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;