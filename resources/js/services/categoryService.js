import api from "./api";

export const getAllCategories = async () => {
    try {
        const response = await api.get("/categories");
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

export const getCategoryById = async (id) => {
    try {
        const response = await api.get(`/categories/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching category ${id}:`, error);
        throw error;
    }
};

export const createCategory = async (categoryData) => {
    try {
        const response = await api.post("/categories", categoryData);
        return response.data;
    } catch (error) {
        console.error("Error creating category:", error);
        throw error;
    }
};

export const updateCategory = async (id, categoryData) => {
    try {
        const response = await api.put(`/categories/${id}`, categoryData);
        return response.data;
    } catch (error) {
        console.error(`Error updating category ${id}:`, error);
        throw error;
    }
};

export const deleteCategory = async (id) => {
    try {
        const response = await api.delete(`/categories/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting category ${id}:`, error);
        throw error;
    }
};

export const getTodosByCategory = async (id) => {
    try {
        const response = await api.get(`/categories/${id}/todos`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching todos for category ${id}:`, error);
        throw error;
    }
};
