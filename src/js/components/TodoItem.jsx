import React, { useState } from 'react';

const TodoItem = ({ task, index, deleteTask, toggleTask }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <li
      className={`list-group-item todo-item ${task.is_done ? 'todo-completed' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="d-flex align-items-center">
        <input
          type="checkbox"
          className="form-check-input rounded-circle form-check-input-success todo-checkbox"
          checked={task.is_done}
          onChange={() => toggleTask(index)}
        />
        <span className="todo-text">{task.label}</span>
      </div>
      {hovered && (
        <i
          className="bi bi-trash todo-delete"
          onClick={() => deleteTask(index)}
        ></i>
      )}
    </li>
  );
};

export default TodoItem;
