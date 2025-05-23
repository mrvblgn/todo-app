import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createTodo, updateTodo } from "@/services/todoService";
import { getAllCategories } from "@/services/categoryService";
import CategorySelector from "@/components/category/CategorySelector";

const priorities = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Başlık zorunludur.")
    .matches(/^[a-zA-ZçÇğĞıİöÖşŞüÜ0-9 ]+$/, "Geçersiz başlık."),
  description: yup
    .string()
    .matches(/^[a-zA-ZçÇğĞıİöÖşŞüÜ0-9 ]+$/, "Geçersiz açıklama."),
  dueDate: yup
    .date()
    .min(new Date(), "Bitiş tarihi bugünden sonra olmalıdır."),
  priority: yup.string().required("Öncelik zorunludur."),
  categories: yup.array().min(1, "En az bir kategori seçmelisiniz.")
});

const TodoForm = ({ onTodoCreated, initialData, onSuccess, onCancel }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      priority: initialData?.priority || "medium",
      dueDate: initialData?.due_date || "",
      categories: initialData?.categories || []
    }
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getAllCategories();
      if (res.status === "success") setCategories(res.data);
    };
    fetchCategories();
  }, []);

  const handleCategoriesChange = (value) => {
    setValue("categories", value);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const todoData = {
        title: data.title,
        description: data.description,
        priority: data.priority,
        due_date: data.dueDate,
        categories: data.categories,
      };

      let res;
      if (initialData && initialData.id) {
        res = await updateTodo(initialData.id, todoData);
        if (onSuccess) onSuccess(res.data);
      } else {
        res = await createTodo(todoData);
        if (onSuccess) onSuccess(res.data);
        // Reset form
        setValue("title", "");
        setValue("description", "");
        setValue("priority", "medium");
        setValue("dueDate", "");
        setValue("categories", []);
      }
    } catch (err) {
      setValue("submit", "Failed to create todo. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block font-medium">Başlık</label>
        <input
          className={`input ${errors.title ? 'border-red-500' : ''}`}
          {...register('title')}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Açıklama</label>
        <textarea
          className={`input ${errors.description ? 'border-red-500' : ''}`}
          {...register('description')}
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Priority</label>
        <select
          className={`input ${errors.priority ? 'border-red-500' : ''}`}
          {...register('priority')}
        >
          {priorities.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {errors.priority && <p className="text-red-500 text-sm mt-1">{errors.priority.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Bitiş Tarihi</label>
        <input
          className={`input ${errors.dueDate ? 'border-red-500' : ''}`}
          type="date"
          {...register('dueDate')}
        />
        {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Kategoriler</label>
        <CategorySelector
          categories={categories}
          value={register('categories').value}
          onChange={handleCategoriesChange}
        />
        {errors.categories && <p className="text-red-500 text-sm mt-1">{errors.categories.message}</p>}
      </div>

      {errors.submit && (
        <p className="text-red-500 text-sm">{errors.submit.message}</p>
      )}

      <div className="flex gap-2">
        <button
          className="btn btn-primary"
          type="submit"
          disabled={loading}
        >
          {loading ? "Saving..." : initialData ? "Todo'yu Güncelle" : "Todo Ekle"}
        </button>
        {onCancel && (
          <button
            className="btn btn-secondary"
            type="button"
            onClick={onCancel}
          >
            İptal Et
          </button>
        )}
      </div>
    </form>
  );
};

export default TodoForm;