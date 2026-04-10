import React, { useState, useEffect, useRef } from "react";

type Props = {
  show: boolean;
  onClose: () => void;
  onAdd: (text: string, deadline: string) => void;
};

const AddTaskModal: React.FC<Props> = ({ show, onClose, onAdd }) => {
  const [text, setText] = useState("");
  const [deadline, setDeadline] = useState("");
  const [errors, setErrors] = useState<{ text?: string; deadline?: string }>(
    {},
  );
  const textRef = useRef<HTMLTextAreaElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (show) {
      setText("");
      setDeadline("");
      setErrors({});
      setTimeout(() => textRef.current?.focus(), 0);
    }
  }, [show]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (show) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [show, onClose]);

  if (!show) return null;

  const validate = () => {
    const newErrors: { text?: string; deadline?: string } = {};

    if (!text.trim()) {
      newErrors.text = "Task description is required";
    } else if (text.trim().length <= 10) {
      newErrors.text = "Must be longer than 10 characters";
    }

    if (!deadline) {
      newErrors.deadline = "Deadline is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = () => {
    if (!validate()) return;

    onAdd(text.trim(), deadline);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal" style={{ paddingRight: "35px" }}>
        <h3 style={{ marginBottom: "15px" }}>Add Task</h3>

        <label style={{ fontSize: "14px", fontWeight: 500 }}>
          Task Description <span style={{ color: "red" }}>*</span>
        </label>

        <textarea
          ref={textRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder="Enter task details..."
          onKeyDown={(e) => e.key === "Enter" && e.ctrlKey && handleAdd()}
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "5px",
            marginBottom: "5px",
            borderRadius: "6px",
            border: errors.text ? "1px solid red" : "1px solid #ccc",
            resize: "none",
          }}
        />

        {errors.text && (
          <div style={{ color: "red", fontSize: "12px", marginBottom: "10px" }}>
            {errors.text}
          </div>
        )}

        <label style={{ fontSize: "14px", fontWeight: 500 }}>
          Deadline <span style={{ color: "red" }}>*</span>
        </label>

        <div
          onClick={() =>
            dateRef.current?.showPicker?.() || dateRef.current?.focus()
          }
          style={{
            display: "flex",
            alignItems: "center",
            border: errors.deadline ? "1px solid red" : "1px solid #ccc",
            borderRadius: "6px",
            padding: "8px",
            marginTop: "5px",
            marginBottom: "5px",
            cursor: "pointer",
            background: "white",
          }}
        >
          <input
            ref={dateRef}
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: "14px",
              background: "transparent",
              cursor: "pointer",
            }}
          />
        </div>

        {errors.deadline && (
          <div style={{ color: "red", fontSize: "12px", marginBottom: "10px" }}>
            {errors.deadline}
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "10px",
          }}
        >
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>

          <button
            className="btn btn-primary"
            onClick={handleAdd}
            style={{ marginLeft: "10px" }}
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
