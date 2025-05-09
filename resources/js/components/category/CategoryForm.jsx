import React, { useState } from "react";

const CategoryForm = ({ initialData, onSubmit, onCancel }) => {
  const safeData = initialData || {};
  const [name, setName] = useState(safeData.name || "");
  const [color, setColor] = useState(safeData.color || "#60a5fa"); // Varsayılan bir renk

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, color });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">İsim</label>
        <input className="input" value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div>
        <label className="block font-medium">Renk</label>
        <input
          type="color"
          className="w-12 h-8 p-0 border-0"
          value={color}
          onChange={e => setColor(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <button className="btn btn-primary" type="submit">Kaydet</button>
        {onCancel && <button className="btn btn-secondary" type="button" onClick={onCancel}>İptal Et</button>}
      </div>
    </form>
  );
};

export default CategoryForm;