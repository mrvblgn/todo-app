import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slices/todoSlice';
import categoryReducer from './slices/categorySlice';
import authReducer from './slices/authSlice';

const store = configureStore({
    reducer: {
        todos: todoReducer,
        categories: categoryReducer,
        auth: authReducer,
    },
});

export default store;