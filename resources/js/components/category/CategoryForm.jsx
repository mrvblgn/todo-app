import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Kategori adı zorunludur.")
    .matches(/^[a-zA-ZçÇğĞıİöÖşŞüÜ0-9 ]+$/, "Geçersiz kategori adı."),
  color: yup.string().required("Kategori rengi zorunludur.")
});

const CategoryForm = ({ initialData, onSubmit, onCancel }) => {
  const safeData = initialData || {};
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: safeData.name || "",
      color: safeData.color || "#60a5fa"
    }
  });

  const handleColorChange = (e) => {
    setValue("color", e.target.value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block font-medium">Kategori Adı</label>
        <input
          className={`input ${errors.name ? 'border-red-500' : ''}`}
          {...register('name')}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Kategori Rengi</label>
        <input
          type="color"
          className={`w-12 h-8 p-0 border-0 ${errors.color ? 'border-red-500' : ''}`}
          {...register('color')}
          onChange={handleColorChange}
        />
        {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color.message}</p>}
      </div>

      <div className="flex gap-2">
        <button className="btn btn-primary" type="submit">
          {initialData ? "Kategoriyi Güncelle" : "Kategori Oluştur"}
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

export default CategoryForm;