import React, { useState, useEffect } from "react";
import { createTodo } from "@/services/todoService";
import { getAllCategories } from "@/services/categoryService";
import CategorySelector from "@/components/category/CategorySelector";

const priorities = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const TodoForm = ({ onTodoCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Kategorileri çek
    const fetchCategories = async () => {
      const res = await getAllCategories();
      if (res.status === "success") setCategories(res.data);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const todoData = {
        title,
        description,
        priority,
        due_date: dueDate,
        categories: selectedCategories,
      };
      const res = await createTodo(todoData);
      if (onTodoCreated) onTodoCreated(res.data);
      // Formu temizle
      setTitle("");
      setDescription("");
      setPriority("medium");
      setDueDate("");
      setSelectedCategories([]);
    } catch (err) {
      alert("Todo oluşturulamadı!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Title</label>
        <input className="input" value={title} onChange={e => setTitle(e.target.value)} required />
      </div>
      <div>
        <label className="block font-medium">Description</label>
        <textarea className="input" value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <div>
        <label className="block font-medium">Priority</label>
        <select className="input" value={priority} onChange={e => setPriority(e.target.value)}>
          {priorities.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-medium">Due Date</label>
        <input className="input" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
      </div>
      <div>
        <label className="block font-medium">Categories</label>
        <CategorySelector
          categories={categories}
          value={selectedCategories}
          onChange={setSelectedCategories}
        />
      </div>
      <button className="btn btn-primary" disabled={loading}>
        {loading ? "Adding..." : "Add Todo"}
      </button>
    </form>
  );
};

export default TodoForm;
