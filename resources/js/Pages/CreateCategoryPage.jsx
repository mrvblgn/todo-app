import React from "react";
import CategoryForm from "@/components/category/CategoryForm";

const CreateCategoryPage = () => (
    <div className="min-h-screen p-8">
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Create New Category</h1>
            <div className="bg-white rounded-lg shadow p-6">
                <CategoryForm />
            </div>
        </div>
    </div>
);

export default CreateCategoryPage;
