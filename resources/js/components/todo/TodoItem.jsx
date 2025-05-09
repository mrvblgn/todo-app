import React from "react";

const statusColors = {
  completed: "bg-green-100 text-green-800",
  in_progress: "bg-blue-100 text-blue-800",
  pending: "bg-yellow-100 text-yellow-800",
};

const TodoItem = ({ todo, onStatusChange, onEdit, onDelete }) => (
  <li className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
    <div>
      <div className="font-medium text-lg">{todo.title}</div>
      {todo.description && <div className="text-gray-600 text-sm">{todo.description}</div>}
    </div>
    <div className="flex items-center gap-2">
      <span className={`px-2 py-1 rounded text-sm ${statusColors[todo.status] || "bg-gray-200 text-gray-700"}`}>
        {todo.status}
      </span>
      {onStatusChange && (
        <select
          className="input text-xs py-1 px-2"
          value={todo.status}
          onChange={e => onStatusChange(todo.id, e.target.value)}
        >
          <option value="pending">pending</option>
          <option value="in_progress">in_progress</option>
          <option value="completed">completed</option>
        </select>
      )}
      {onEdit && (
        <button className="btn btn-xs btn-secondary" onClick={() => onEdit(todo)} title="Edit">
          ✏️
        </button>
      )}
      {onDelete && (
        <button className="btn btn-xs btn-danger" onClick={() => onDelete(todo.id)} title="Delete">
          🗑️
        </button>
      )}
    </div>
  </li>
);

export default TodoItem;
