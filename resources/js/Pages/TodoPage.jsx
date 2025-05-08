import React, { useState } from "react";
import TodoFilter from "@/components/todo/TodoFilter";
import TodoList from "@/components/todo/TodoList";

const TodoPage = () => {
    const [filters, setFilters] = useState({});

    const handleFilter = (filterParams) => {
        setFilters(filterParams);
    };

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Todos</h1>
                <div className="bg-white rounded-lg shadow p-6">
                    <TodoFilter onFilter={handleFilter} />
                    <TodoList filters={filters} />
                </div>
            </div>
        </div>
    );
};

export default TodoPage;