import React, { useState } from "react";
import { Task } from "../App";

type Props = {
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggle: (task: Task) => void;
  filter: string;
};

const TaskTable: React.FC<Props> = ({ tasks, onDelete, onToggle, filter }) => {
  const [sortField, setSortField] = useState<
    "task" | "deadline" | "status" | ""
  >("");
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (field: "task" | "deadline" | "status") => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const isOverdue = (task: Task) => {
    return (
      task.deadline && !task.isDone && new Date(task.deadline) < new Date()
    );
  };

  const formatDate = (date?: string) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString();
  };

  const processed = tasks
    .filter((task) => {
      if (filter === "open") return !task.isDone;
      if (filter === "done") return task.isDone;
      return true; // "all"
    })
    .sort((a, b) => {
      let result = 0;

      if (sortField === "deadline") {
        const da = a.deadline ? new Date(a.deadline).getTime() : 0;
        const db = b.deadline ? new Date(b.deadline).getTime() : 0;
        result = da - db;
      }
      if (sortField === "task") {
        result = Number(a.isDone) - Number(b.isDone);
      }

      if (sortField === "status") {
        result = Number(a.isDone) - Number(b.isDone);
      }

      return sortAsc ? result : -result;
    });

  return (
    <div style={{ maxHeight: "300px", overflowY: "auto", marginTop: "10px" }}>
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => handleSort("task")}>Task ⬍</th>
            <th onClick={() => handleSort("deadline")}>Deadline ⬍</th>
            <th onClick={() => handleSort("status")}>Status ⬍</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {processed.map((task) => (
            <tr key={task.id} className={isOverdue(task) ? "row-overdue" : ""}>
              <div className="text-ellipsis" title={task.text}>
                {task.text}
              </div>
              <td>{formatDate(task.deadline)}</td>

              <td>
                <span
                  className={`badge ${task.isDone ? "badge-done" : "badge-open"}`}
                >
                  {task.isDone ? "Done" : "Open"}
                </span>
              </td>

              <td>
                <button
                  className="btn btn-secondary"
                  onClick={() => onToggle(task)}
                >
                  {task.isDone ? "Reopen" : "Done"}
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(task.id)}
                  style={{ marginLeft: "5px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
