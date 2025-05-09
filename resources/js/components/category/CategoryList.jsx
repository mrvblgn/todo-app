import React, { useEffect, useState } from "react";
import { getAllCategories, createCategory, updateCategory, deleteCategory } from "@/services/categoryService";
import CategoryForm from "@/components/category/CategoryForm";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editCategory, setEditCategory] = useState(null);
    const [deleteCategoryId, setDeleteCategoryId] = useState(null);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await getAllCategories();
            if (res.status === "success") setCategories(res.data);
            else setError("Failed to fetch categories");
        } catch (err) {
            setError("Failed to fetch categories");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSave = async (data) => {
        try {
            if (editCategory) {
                await updateCategory(editCategory.id, data);
            } else {
                await createCategory(data);
            }
            setShowForm(false);
            setEditCategory(null);
            fetchCategories();
        } catch {
            alert("Kategori kaydedilemedi!");
        }
    };

    const handleDelete = async () => {
        try {
            await deleteCategory(deleteCategoryId);
            setDeleteCategoryId(null);
            fetchCategories();
        } catch {
            alert("Kategori silinemedi!");
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Kategoriler</h2>
                <button className="btn btn-primary" onClick={() => { setEditCategory(null); setShowForm(true); }}>
                    + Kategori Ekle
                </button>
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <ul className="space-y-2">
                    {categories.map(cat => (
                        <li key={cat.id} className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span
                                    className="inline-block w-4 h-4 rounded-full"
                                    style={{ backgroundColor: cat.color }}
                                    title={cat.color}
                                ></span>
                                <span className="font-medium">{cat.name}</span>
                            </div>
                            <div className="flex gap-2">
                                <button className="btn btn-xs btn-secondary" onClick={() => { setEditCategory(cat); setShowForm(true); }}>
                                    ✏️
                                </button>
                                <button className="btn btn-xs btn-danger" onClick={() => setDeleteCategoryId(cat.id)}>
                                    🗑️
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {/* Ekle/Düzenle Modalı */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
                            onClick={() => setShowForm(false)}
                            title="Kapat"
                        >×</button>
                        <CategoryForm
                            initialData={editCategory}
                            onSubmit={handleSave}
                            onCancel={() => setShowForm(false)}
                        />
                    </div>
                </div>
            )}

            {/* Silme Onay Modalı */}
            {deleteCategoryId && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
                        <div className="mb-4">Bu kategoriyi silmek istediğine emin misin?</div>
                        <div className="flex gap-2">
                            <button className="btn btn-danger" onClick={handleDelete}>Evet, Sil</button>
                            <button className="btn btn-secondary" onClick={() => setDeleteCategoryId(null)}>Vazgeç</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryList;