import React, { useState } from "react";
import { validators, validateForm } from "@/utils/validators";

const categoryRules = {
  name: [validators.required, validators.categoryName],
  color: [validators.required]
};

const CategoryForm = ({ initialData, onSubmit, onCancel }) => {
  const safeData = initialData || {};
  const [formData, setFormData] = useState({
    name: safeData.name || "",
    color: safeData.color || "#60a5fa"
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm(formData, categoryRules);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Name</label>
        <input 
          className={`input ${errors.name ? 'border-red-500' : ''}`}
          value={formData.name}
          onChange={e => handleChange('name', e.target.value)}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block font-medium">Color</label>
        <input
          type="color"
          className={`w-12 h-8 p-0 border-0 ${errors.color ? 'border-red-500' : ''}`}
          value={formData.color}
          onChange={e => handleChange('color', e.target.value)}
        />
        {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color}</p>}
      </div>

      <div className="flex gap-2">
        <button className="btn btn-primary" type="submit">
          {initialData ? "Update Category" : "Create Category"}
        </button>
        {onCancel && (
          <button 
            className="btn btn-secondary" 
            type="button" 
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default CategoryForm;