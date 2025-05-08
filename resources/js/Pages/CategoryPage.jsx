import React from "react";
import CategoryList from "@/components/category/CategoryList";

const CategoryPage = () => (
    <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Categories</h1>
            <div className="bg-white rounded-lg shadow p-6">
                <CategoryList />
            </div>
        </div>
    </div>
);

export default CategoryPage;
