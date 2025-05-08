import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slices/todoSlice';
import categoryReducer from './slices/categorySlice';

const store = configureStore({
    reducer: {
        todos: todoReducer,
        categories: categoryReducer,
    },
});

export default store;