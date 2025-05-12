import React, { useState, useEffect } from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const staticUser = 'Victor_Santana';

  const fetchTasks = async () => {
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/users/${staticUser}`);
      if (response.ok) {
        const data = await response.json();
        setTasks(data.todos || []);
      } else if (response.status === 404) {
        await createUser();
      } else {
        throw new Error('No se pudieron obtener las tareas');
      }
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
    }
  };

  const createUser = async () => {
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/users/${staticUser}`, {
        method: 'POST'
      });
      if (response.ok) {
        fetchTasks();
      } else {
        throw new Error('Error al crear el usuario');
      }
    } catch (error) {
      console.error('No se pudo crear el usuario:', error);
    }
  };

  const addTask = async (label) => {
    if (!label.trim()) return;

    try {
      const response = await fetch(`https://playground.4geeks.com/todo/todos/${staticUser}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ label, is_done: false })
      });

      if (response.ok) {
        fetchTasks();
      } else {
        throw new Error('No se pudo agregar la tarea');
      }
    } catch (error) {
      console.error('Error al agregar tarea:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchTasks();
      } else {
        throw new Error('No se pudo eliminar la tarea');
      }
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  };

  const toggleTask = async (id, currentState, label) => {
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ label, is_done: !currentState })
      });

      if (response.ok) {
        fetchTasks();
      } else {
        throw new Error('No se pudo actualizar la tarea');
      }
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Lista de Tareas</h1>
      <TodoInput addTask={addTask} />
      <TodoList
        tasks={tasks}
        deleteTask={(index) => deleteTask(tasks[index].id)}
        toggleTask={(index) =>
          toggleTask(tasks[index].id, tasks[index].is_done, tasks[index].label)
        }
      />
    </div>
  );
};

export default TodoApp;


