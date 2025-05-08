import api from "./api";

export const getAllTodos = async (filters = {}) => {
    try {
        const response = await api.get("/todos", { params: filters });
        return response.data;
    } catch (error) {
        console.error("Error fetching todos:", error);
        throw error;
    }
};

export const getTodoById = async (id) => {
    try {
        const response = await api.get(`/todos/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching todo ${id}:`, error);
        throw error;
    }
};

export const createTodo = async (todoData) => {
    try {
        const response = await api.post("/todos", todoData);
        return response.data;
    } catch (error) {
        console.error("Error creating todo:", error);
        throw error;
    }
};

export const updateTodo = async (id, todoData) => {
    try {
        const response = await api.put(`/todos/${id}`, todoData);
        return response.data;
    } catch (error) {
        console.error(`Error updating todo ${id}:`, error);
        throw error;
    }
};

export const updateTodoStatus = async (id, status) => {
    try {
        const response = await api.patch(`/todos/${id}/status`, { status });
        return response.data;
    } catch (error) {
        console.error(`Error updating todo ${id} status:`, error);
        throw error;
    }
};

export const deleteTodo = async (id) => {
    try {
        const response = await api.delete(`/todos/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting todo ${id}:`, error);
        throw error;
    }
};

export const searchTodos = async (query) => {
    try {
        const response = await api.get("/todos/search", { params: { q: query } });
        return response.data;
    } catch (error) {
        console.error("Error searching todos:", error);
        throw error;
    }
};

export const getTodosByStatus = async () => {
    try {
        const response = await api.get("/stats/todos");
        return response.data;
    } catch (error) {
        console.error("Error fetching todos by status:", error);
        throw error;
    }
};

export const getTodosByPriority = async () => {
    try {
        const response = await api.get("/stats/priorities");
        return response.data;
    } catch (error) {
        console.error("Error fetching todos by priority:", error);
        throw error;
    }
};
