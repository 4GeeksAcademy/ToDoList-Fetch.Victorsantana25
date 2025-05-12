import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ tasks, deleteTask, toggleTask }) => {
  return (
    <ul className="list-group todo-list">
      {tasks.map((task, index) => (
        <TodoItem
          key={index}
          index={index}
          task={task}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
        />
      ))}
    </ul>
  );
};

export default TodoList;