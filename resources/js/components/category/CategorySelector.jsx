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
        {/* Renk göstergesi */}
        <span
          style={{
            display: "inline-block",
            width: 12,
            height: 12,
            backgroundColor: cat.color,
            borderRadius: "50%",
            marginRight: 6,
            verticalAlign: "middle"
          }}
        ></span>
        {cat.name}
      </option>
    ))}
  </select>
);

export default CategorySelector;
