import "./styles.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskTable from "./components/TaskTable";
import AddTaskModal from "./components/AddTaskModal";

export type Task = {
  id: number;
  text: string;
  deadline?: string;
  isDone: boolean;
};

const API = process.env.REACT_APP_API_URL + "/api/todo";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("all");

  // Loading and error handling states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API);
      setTasks(response.data);
    } catch (err) {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (taskText: string, deadline: string) => {
    const date = new Date(deadline);
    date.setHours(23, 59, 59, 999);
    await axios.post(API, {
      text: taskText,
      deadline: date,
      isDone: false,
    });

    fetchTasks();
  };

  const deleteTask = async (id: number) => {
    await axios.delete(`${API}/${id}`);
    fetchTasks();
  };

  const toggleTask = async (task: Task) => {
    await axios.put(`${API}/${task.id}`, {
      ...task,
      isDone: !task.isDone,
    });

    fetchTasks();
  };

  return (
    <div style={{ padding: "40px", background: "#f4f6f8", minHeight: "100vh" }}>
      <div className="container">
        <div
          style={{
            marginBottom: "30px",
          }}
        >
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          <h2 style={{ margin: 0 }}>Todo Tasks</h2>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              className={`btn ${filter === "all" ? "btn-active" : "btn-secondary"}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>

            <button
              className={`btn ${filter === "open" ? "btn-active" : "btn-secondary"}`}
              onClick={() => setFilter("open")}
            >
              Open
            </button>

            <button
              className={`btn ${filter === "done" ? "btn-active" : "btn-secondary"}`}
              onClick={() => setFilter("done")}
            >
              Done
            </button>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            + Add Task
          </button>
        </div>

        <TaskTable
          tasks={tasks}
          onDelete={deleteTask}
          onToggle={toggleTask}
          filter={filter}
        />

        <AddTaskModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onAdd={addTask}
        />
      </div>
    </div>
  );
}

export default App;
