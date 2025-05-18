import React, { useState, useEffect } from "react";
import { createTodo, updateTodo } from "@/services/todoService";
import { getAllCategories } from "@/services/categoryService";
import CategorySelector from "@/components/category/CategorySelector";
import { validators, validateForm } from "@/utils/validators";

const priorities = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const todoRules = {
  title: [validators.required, validators.todoTitle],
  description: [validators.todoDescription],
  dueDate: [validators.dueDate],
  priority: [validators.required],
  categories: [validators.required]
};

const TodoForm = ({ onTodoCreated, initialData, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    priority: initialData?.priority || "medium",
    dueDate: initialData?.due_date || "",
    categories: initialData?.categories || []
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getAllCategories();
      if (res.status === "success") setCategories(res.data);
    };
    fetchCategories();
  }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when field is modified
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm(formData, todoRules);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const todoData = {
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        due_date: formData.dueDate,
        categories: formData.categories,
      };

      let res;
      if (initialData && initialData.id) {
        res = await updateTodo(initialData.id, todoData);
        if (onSuccess) onSuccess(res.data);
      } else {
        res = await createTodo(todoData);
        if (onSuccess) onSuccess(res.data);
        // Reset form
        setFormData({
          title: "",
          description: "",
          priority: "medium",
          dueDate: "",
          categories: []
        });
      }
    } catch (err) {
      setErrors({
        submit: "Failed to create todo. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Başlık</label>
        <input 
          className={`input ${errors.title ? 'border-red-500' : ''}`}
          value={formData.title}
          onChange={e => handleChange('title', e.target.value)}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      <div>
        <label className="block font-medium">Açıklama</label>
        <textarea 
          className={`input ${errors.description ? 'border-red-500' : ''}`}
          value={formData.description}
          onChange={e => handleChange('description', e.target.value)}
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      <div>
        <label className="block font-medium">Priority</label>
        <select 
          className={`input ${errors.priority ? 'border-red-500' : ''}`}
          value={formData.priority}
          onChange={e => handleChange('priority', e.target.value)}
        >
          {priorities.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {errors.priority && <p className="text-red-500 text-sm mt-1">{errors.priority}</p>}
      </div>

      <div>
        <label className="block font-medium">Bitiş Tarihi</label>
        <input 
          className={`input ${errors.dueDate ? 'border-red-500' : ''}`}
          type="date"
          value={formData.dueDate}
          onChange={e => handleChange('dueDate', e.target.value)}
        />
        {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
      </div>

      <div>
        <label className="block font-medium">Kategoriler</label>
        <CategorySelector
          categories={categories}
          value={formData.categories}
          onChange={value => handleChange('categories', value)}
        />
        {errors.categories && <p className="text-red-500 text-sm mt-1">{errors.categories}</p>}
      </div>

      {errors.submit && (
        <p className="text-red-500 text-sm">{errors.submit}</p>
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
