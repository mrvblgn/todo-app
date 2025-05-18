import React from "react";
import TodoForm from "@/components/todo/TodoForm";

const CreateTodoPage = () => (
    <div className="min-h-screen p-8">
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Yeni Todo Ekle</h1>
            <div className="bg-white rounded-lg shadow p-6">
                <TodoForm />
            </div>
        </div>
    </div>
);

export default CreateTodoPage;