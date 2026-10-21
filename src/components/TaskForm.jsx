
import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (title.trim() === "") return;

    onAddTask(title.trim());
    setTitle("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <button type="submit" className="add-btn">
        + Add Task
      </button>
    </form>
  );
}

export default TaskForm;
