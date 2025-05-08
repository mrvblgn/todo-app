import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    loading: false,
    error: null,
};

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.items = action.payload;
        },
        addCategory: (state, action) => {
            state.items.push(action.payload);
        },
        updateCategory: (state, action) => {
            const index = state.items.findIndex(category => category.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteCategory: (state, action) => {
            state.items = state.items.filter(category => category.id !== action.payload);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const {
    setCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    setLoading,
    setError,
} = categorySlice.actions;

export default categorySlice.reducer;