import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setTodos, setLoading, setError, deleteTodo, updateTodo } from '@/store/slices/todoSlice';
import { getAllTodos, searchTodos, deleteTodo as deleteTodoService } from "@/services/todoService";
import Pagination from "@/components/common/Pagination";
import TodoItem from "@/components/todo/TodoItem";
import TodoForm from "@/components/todo/TodoForm";

const TodoList = ({ filters = {}, page = 1, onPageChange }) => {
  const dispatch = useDispatch();
  const { items: todos, loading, error, meta } = useSelector(state => state.todos);
  const [selectedTodo, setSelectedTodo] = React.useState(null);
  const [editTodo, setEditTodo] = React.useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch(setLoading(true));
      try {
        let response;
        if (filters.search && filters.search.trim() !== "") {
          response = await searchTodos(filters.search, page);
        } else {
          response = await getAllTodos({ ...filters, page });
        }
        if (response.status === 'success') {
          if (Array.isArray(response.data)) {
            dispatch(setTodos({
              data: response.data,
              meta: response.meta || null
            }));
          } else if (response.data && response.data.data) {
            dispatch(setTodos({
              data: response.data.data,
              meta: response.data.meta || null
            }));
          } else {
            dispatch(setTodos({
              data: [],
              meta: null
            }));
            dispatch(setError('Invalid response format'));
          }
        } else {
          dispatch(setError('Failed to fetch todos'));
        }
      } catch (err) {
        console.error('Error fetching todos:', err);
        dispatch(setError(err.response?.data?.message || 'Failed to fetch todos'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchTodos();
  }, [filters, page, dispatch]);

  const handleDelete = async (id) => {
    if (!window.confirm("Bu todo silinsin mi?")) return;
    try {
      await deleteTodoService(id);
      dispatch(deleteTodo(id));
    } catch (err) {
      alert("Todo silinemedi!");
    }
  };

  const handleEdit = (todo) => {
    setEditTodo(todo);
  };

  const handleEditSuccess = (updatedTodo) => {
    dispatch(updateTodo(updatedTodo));
    setEditTodo(null);
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;
  if (!todos || !todos.length) return <div className="text-center py-4">No todos found</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Yapılacaklar Listesi</h2>
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
          currentPage={meta.pagination.current_page}
          totalPages={meta.pagination.last_page}
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