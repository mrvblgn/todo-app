import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setCategories, setLoading, setError, addCategory, updateCategory, deleteCategory } from '@/store/slices/categorySlice';
import { getAllCategories, createCategory, updateCategory as updateCategoryService, deleteCategory as deleteCategoryService, getTodosByCategory } from "@/services/categoryService";
import CategoryForm from "@/components/category/CategoryForm";

const CategoryList = () => {
    const dispatch = useDispatch();
    const { items: categories, loading, error } = useSelector(state => state.categories);
    const [showForm, setShowForm] = React.useState(false);
    const [editCategory, setEditCategory] = React.useState(null);
    const [deleteCategoryId, setDeleteCategoryId] = React.useState(null);
    const [categoryTodos, setCategoryTodos] = React.useState({});

    const fetchCategories = async () => {
        dispatch(setLoading(true));
        try {
            const res = await getAllCategories();
            if (res.status === "success") {
                dispatch(setCategories(res.data));
            } else {
                dispatch(setError("Failed to fetch categories"));
            }
        } catch (err) {
            dispatch(setError("Failed to fetch categories"));
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [dispatch]);

    // Kategoriler yüklendikten sonra, her kategori için todo'ları çek
    useEffect(() => {
        if (categories.length > 0) {
            categories.forEach(category => {
                fetchTodosForCategory(category.id);
            });
        }
    }, [categories]);

    const handleSave = async (data) => {
        try {
            if (editCategory) {
                const updated = await updateCategoryService(editCategory.id, data);
                dispatch(updateCategory(updated.data));
            } else {
                const created = await createCategory(data);
                dispatch(addCategory(created.data));
            }
            setShowForm(false);
            setEditCategory(null);
        } catch {
            alert("Kategori kaydedilemedi!");
        }
    };

    const handleDelete = async () => {
        try {
            await deleteCategoryService(deleteCategoryId);
            dispatch(deleteCategory(deleteCategoryId));
            setDeleteCategoryId(null);
        } catch {
            alert("Kategori silinemedi!");
        }
    };

    const fetchTodosForCategory = async (categoryId) => {
        if (categoryTodos[categoryId]) return; // daha önce yüklendiyse tekrar çekme
        try {
            const res = await getTodosByCategory(categoryId);
            setCategoryTodos(prev => ({
                ...prev,
                [categoryId]: res.data // API yanıtındaki todo listesi
            }));
        } catch (err) {
            setCategoryTodos(prev => ({
                ...prev,
                [categoryId]: []
            }));
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Kategoriler</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(true)}
                >
                    Yeni Kategori
                </button>
            </div>

            {showForm && (
                <div className="mb-4">
                    <CategoryForm
                        initialData={editCategory}
                        onSubmit={handleSave}
                        onCancel={() => {
                            setShowForm(false);
                            setEditCategory(null);
                        }}
                    />
                </div>
            )}

            <div className="grid grid-cols-1 gap-4">
                {categories.map(category => (
                    <div
                        key={category.id}
                        className="p-4 bg-white rounded shadow"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <span
                                    className="w-4 h-4 rounded-full"
                                    style={{ backgroundColor: category.color }}
                                ></span>
                                <h3 className="font-medium">{category.name}</h3>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    className="btn btn-sm btn-secondary"
                                    onClick={() => {
                                        setEditCategory(category);
                                        setShowForm(true);
                                    }}
                                >
                                    Düzenle
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => setDeleteCategoryId(category.id)}
                                >
                                    Sil
                                </button>
                            </div>
                        </div>
                        <div>
                            <strong>Todo'lar:</strong>
                            <ul className="list-disc ml-6">
                                {Array.isArray(categoryTodos[category.id]) ? (
                                    categoryTodos[category.id].length === 0 ? (
                                        <li>Bu kategoriye ait todo yok.</li>
                                    ) : (
                                        categoryTodos[category.id].map(todo => (
                                            <li key={todo.id}>{todo.title}</li>
                                        ))
                                    )
                                ) : (
                                    <li>Yükleniyor...</li>
                                )}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>

            {deleteCategoryId && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                        <h3 className="text-lg font-bold mb-4">Kategori Sil</h3>
                        <p className="mb-4">Bu kategoriyi silmek istediğinizden emin misiniz?</p>
                        <div className="flex justify-end gap-2">
                            <button
                                className="btn btn-secondary"
                                onClick={() => setDeleteCategoryId(null)}
                            >
                                İptal
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={handleDelete}
                            >
                                Sil
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryList;