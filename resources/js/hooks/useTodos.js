import { useState, useEffect } from "react";
import todoService from "@/services/todoService";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const data = await todoService.getTodos();
      setTodos(data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return { todos, loading, error, refetch: fetchTodos };
}
