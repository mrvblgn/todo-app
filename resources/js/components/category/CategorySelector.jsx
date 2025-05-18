import React from "react";

const CategorySelector = ({ categories, value, onChange }) => (
  <select
    className="input"
    multiple
    value={value}
    onChange={e =>
      onChange(Array.from(e.target.selectedOptions, opt => Number(opt.value)))
    }
  >
    {categories.map(cat => (
      <option key={cat.id} value={cat.id}>
        ● {cat.name}
      </option>
    ))}
  </select>
);

export default CategorySelector;
