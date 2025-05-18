import { useSelector, useDispatch } from 'react-redux';
import { setTodos, setLoading, setError } from '@/store/slices/todoSlice';
import todoService from "@/services/todoService";

export function useTodos() {
  const dispatch = useDispatch();
  const { items: todos, loading, error } = useSelector(state => state.todos);

  const fetchTodos = async () => {
    dispatch(setLoading(true));
    try {
      const data = await todoService.getTodos();
      dispatch(setTodos(data));
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { todos, loading, error, refetch: fetchTodos };
}
