import React, { useState } from 'react';

const TodoInput = ({ addTask }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask(inputValue);
      setInputValue('');
    }
  };

  return (
    <input
      type="text"
      className="form-control todo-input"
      placeholder="Agregar una tarea"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyPress}
    />
  );
};

export default TodoInput;

