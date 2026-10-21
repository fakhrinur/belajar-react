
import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  function addTask(title) {
    const newTask = {
      id: Date.now(),
      title: title,
      completed: false,
    };

    setTasks((previousTasks) => [...previousTasks, newTask]);
  }

  function toggleTask(id) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const activeTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  return (
    <main className="app">
      <header className="app-header">
        <p className="eyebrow">PRODUCTIVITY APP</p>
        <h1>Task Manager</h1>
        <p className="subtitle">
          Organize your tasks, one step at a time.
        </p>
      </header>

      <section className="task-card">
        <div className="task-summary">
          <div>
            <h2>My Tasks</h2>
            <p>{activeTasks} tasks remaining</p>
          </div>
          <span className="task-count">{tasks.length}</span>
        </div>

        <TaskForm onAddTask={addTask} />

        <div className="filters">
          {["all", "active", "completed"].map((item) => (
            <button
              key={item}
              className={`filter-btn ${
                filter === item ? "selected" : ""
              }`}
              onClick={() => setFilter(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </section>

      <footer>
        Built with React ⚛️
      </footer>
    </main>
  );
}

export default App;
