import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks
export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async (params) => {
        const response = await axios.get('/api/todos', { params });
        return response.data;
    }
);

export const createTodo = createAsyncThunk(
    'todos/createTodo',
    async (todoData) => {
        const response = await axios.post('/api/todos', todoData);
        return response.data;
    }
);

export const updateTodo = createAsyncThunk(
    'todos/updateTodo',
    async ({ id, todoData }) => {
        const response = await axios.put(`/api/todos/${id}`, todoData);
        return response.data;
    }
);

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async (id) => {
        await axios.delete(`/api/todos/${id}`);
        return id;
    }
);

const initialState = {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    filters: {
        status: 'all',
        priority: 'all',
        search: '',
        category: 'all',
    },
    sort: {
        field: 'created_at',
        direction: 'desc',
    },
    pagination: {
        currentPage: 1,
        totalPages: 1,
        perPage: 10,
    },
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
            state.pagination.currentPage = 1; // Reset to first page on filter change
        },
        setSort: (state, action) => {
            state.sort = action.payload;
        },
        setPage: (state, action) => {
            state.pagination.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.data;
                state.pagination.totalPages = action.payload.meta.last_page;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                const index = state.items.findIndex(todo => todo.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.items = state.items.filter(todo => todo.id !== action.payload);
            });
    },
});

export const { setFilter, setSort, setPage } = todoSlice.actions;

export default todoSlice.reducer;