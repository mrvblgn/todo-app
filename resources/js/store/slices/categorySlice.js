import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
        const response = await axios.get('/api/categories');
        return response.data;
    }
);

export const createCategory = createAsyncThunk(
    'categories/createCategory',
    async (categoryData) => {
        const response = await axios.post('/api/categories', categoryData);
        return response.data;
    }
);

export const updateCategory = createAsyncThunk(
    'categories/updateCategory',
    async ({ id, categoryData }) => {
        const response = await axios.put(`/api/categories/${id}`, categoryData);
        return response.data;
    }
);

export const deleteCategory = createAsyncThunk(
    'categories/deleteCategory',
    async (id) => {
        await axios.delete(`/api/categories/${id}`);
        return id;
    }
);

const initialState = {
    items: [],
    status: 'idle',
    error: null,
};

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                const index = state.items.findIndex(category => category.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.items = state.items.filter(category => category.id !== action.payload);
            });
    },
});

export default categorySlice.reducer;