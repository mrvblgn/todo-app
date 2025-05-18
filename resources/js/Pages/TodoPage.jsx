import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoFilter from "@/components/todo/TodoFilter";
import TodoList from "@/components/todo/TodoList";

const TodoPage = () => {
    const [filters, setFilters] = useState({});
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const handleFilter = (filterParams) => {
        setFilters(filterParams);
    };

    const handlePageChange = (newPage) => {
        if (newPage < 1 ) return;
        setPage(newPage);
    };

    return (
        <div className="min-h-screen p-8 relative">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold">Yapılacaklar</h1>
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg w-16 h-16 text-3xl flex items-center justify-center transition-all duration-200"
                        onClick={() => navigate("/create-todo")}
                        title="Create New Todo"
                    >
                        +
                    </button>
                </div>
                <div className="bg-white rounded-lg shadow p-6 relative">
                    <TodoFilter onFilter={handleFilter} />
                    <TodoList filters={filters} page={page} onPageChange={handlePageChange} />
                </div>
            </div>
        </div>
    );
};

export default TodoPage;