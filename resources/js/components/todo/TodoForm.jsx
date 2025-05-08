import React, { useState } from "react";
import api from "@/services/api";

const TodoForm = ({ onTodoCreated }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/todos", { title });
      onTodoCreated(res.data); // Yeni todo'yu listeye ekle
      setTitle("");
    } catch (err) {
      alert("Todo could not be created!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        className="input"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="New todo"
        required
      />
      <button className="btn btn-primary ml-2" disabled={loading}>
        {loading ? "Adding..." : "Add Todo"}
      </button>
    </form>
  );
};

export default TodoForm;
