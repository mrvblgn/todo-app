import React, { useEffect, useState } from "react";
import { getAllCategories } from "@/services/categoryService";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategories();
                if (response.status === 'success') {
                    setCategories(response.data);
                } else {
                    setError('Failed to fetch categories');
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch categories');
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    if (loading) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-red-500 text-center py-4">{error}</div>;
    if (!categories.length) return <div className="text-center py-4">No categories found</div>;

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            <ul className="space-y-2">
                {categories.map(category => (
                    <li key={category.id} className="p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">{category.name}</span>
                        {category.description && (
                            <p className="text-gray-600 mt-1">{category.description}</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;
