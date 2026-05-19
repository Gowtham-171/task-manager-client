import React, { useState } from "react";
import { validateTaskForm, formattedTodayDate } from "../../utils/validators";
import "./TaskForm.css";

const INITIAL_STATE = {
  username: "",
  name: "",
  email: "",
  date: "",
  time: "",
  priority: "",
  hours: "",
  url: "",
  description: "",
  taskTypes: [],
  status: "",
};

function TaskForm({ tasks, onTaskCreated }) {
  const [values, setValues] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleCheckbox(e) {
    const { value, checked } = e.target;
    setValues((prev) => {
      const types = checked
        ? [...prev.taskTypes, value]
        : prev.taskTypes.filter((t) => t !== value);
      return { ...prev, taskTypes: types };
    });
    setErrors((prev) => ({ ...prev, taskTypes: "" }));
  }

  function handleRadio(e) {
    setValues((prev) => ({ ...prev, status: e.target.value }));
    setErrors((prev) => ({ ...prev, status: "" }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateTaskForm(values, tasks);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setSubmitting(true);
      await onTaskCreated(values);
      setValues(INITIAL_STATE);
      setErrors({});
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  function handleReset() {
    setValues(INITIAL_STATE);
    setErrors({});
  }

  const today = formattedTodayDate();

  return (
    <section className="task-panel-section">
      <div className="task-panel-title">
        <h3>📝 Create New Task</h3>
      </div>

      <form id="form" onSubmit={handleSubmit} onReset={handleReset}>
        <div className="input-username">
          <input
            type="text"
            name="username"
            className="username"
            placeholder="Assignee Name *"
            value={values.username}
            onChange={handleChange}
            style={errors.username ? { borderColor: "red" } : {}}
          />
          {errors.username && (
            <span className="error">
              <i className="fa-solid fa-triangle-exclamation" style={{ color: "#c0392b" }}></i>{" "}
              {errors.username}
            </span>
          )}
        </div>

        <div className="input-name">
          <input
            type="text"
            name="name"
            className="name"
            placeholder="Task Name *"
            value={values.name}
            onChange={handleChange}
            style={errors.name ? { borderColor: "red" } : {}}
          />
          {errors.name && (
            <span className="error">
              <i className="fa-solid fa-triangle-exclamation" style={{ color: "#c0392b" }}></i>{" "}
              {errors.name}
            </span>
          )}
        </div>

        <div className="input-email">
          <input
            type="text"
            name="email"
            className="email"
            placeholder="Assignee Email *"
            value={values.email}
            onChange={handleChange}
            style={errors.email ? { borderColor: "red" } : {}}
          />
          {errors.email && (
            <span className="error">
              <i className="fa-solid fa-triangle-exclamation" style={{ color: "#c0392b" }}></i>{" "}
              {errors.email}
            </span>
          )}
        </div>

        <div className="input-date">
          <label className="float-label" htmlFor="date-input">Due Date *</label>
          <input
            type="date"
            name="date"
            id="date-input"
            className="date"
            min={today}
            value={values.date}
            onChange={handleChange}
            style={errors.date ? { borderColor: "red" } : {}}
          />
          {errors.date && (
            <span className="error">
              <i className="fa-solid fa-triangle-exclamation" style={{ color: "#c0392b" }}></i>{" "}
              {errors.date}
            </span>
          )}
        </div>

        <div className="input-time">
          <label className="float-label" htmlFor="time-input">Due Time *</label>
          <input
            type="time"
            name="time"
            id="time-input"
            className="time"
            value={values.time}
            onChange={handleChange}
            style={errors.time ? { borderColor: "red" } : {}}
          />
          {errors.time && (
            <span className="error">
              <i className="fa-solid fa-triangle-exclamation" style={{ color: "#c0392b" }}></i>{" "}
              {errors.time}
            </span>
          )}
        </div>

        <div className="select-priority">
          <label className="float-label" htmlFor="priority-select">Priority Level *</label>
          <select
            name="priority"
            id="priority-select"
            className="priority-selection"
            value={values.priority}
            onChange={handleChange}
            style={errors.priority ? { borderColor: "red" } : {}}
          >
            <option value="" disabled>-- Select priority --</option>
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
          {errors.priority && (
            <span className="error">
              <i className="fa-solid fa-triangle-exclamation" style={{ color: "#c0392b" }}></i>{" "}
              {errors.priority}
            </span>
          )}
        </div>

        <div className="input-hours">
          <label className="float-label float-Hours" htmlFor="hours-input">Estimated Hours *</label>
          <input
            type="number"
            name="hours"
            id="hours-input"
            className="number"
            placeholder="0"
            value={values.hours}
            onChange={handleChange}
            onKeyDown={(e) => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()}
            style={errors.hours ? { borderColor: "red" } : {}}
          />
          {errors.hours && (
            <span className="error">
              <i className="fa-solid fa-triangle-exclamation" style={{ color: "#c0392b" }}></i>{" "}
              {errors.hours}
            </span>
          )}
        </div>

        <div className="project-url">
          <input
            type="text"
            name="url"
            placeholder="Project URL *"
            value={values.url}
            onChange={handleChange}
            style={errors.url ? { borderColor: "red" } : {}}
          />
          {errors.url && (
            <span className="error">
              <i className="fa-solid fa-triangle-exclamation" style={{ color: "#c0392b" }}></i>{" "}
              {errors.url}
            </span>
          )}
        </div>

        <div className="task-description">
          <textarea
            name="description"
            placeholder="Task-Description *"
            value={values.description}
            onChange={handleChange}
            style={errors.description ? { borderColor: "red" } : {}}
          ></textarea>
          {errors.description && (
            <span className="error">
              <i className="fa-solid fa-triangle-exclamation" style={{ color: "#c0392b" }}></i>{" "}
              {errors.description}
            </span>
          )}
        </div>

        <div className="task-type">
          <label className="checkbox-label">Task Type *</label>
          <br />
          <input
            type="checkbox"
            name="taskType"
            className="check"
            value="Bug"
            id="Bug"
            checked={values.taskTypes.includes("Bug")}
            onChange={handleCheckbox}
          />
          <label htmlFor="Bug" className="check-label">Bug Fix</label>

          <input
            type="checkbox"
            name="taskType"
            className="check"
            value="Feature"
            id="Feature"
            checked={values.taskTypes.includes("Feature")}
            onChange={handleCheckbox}
          />
          <label htmlFor="Feature" className="check-label">Feature</label>
          <br className="check-radio-br" />

          <input
            type="checkbox"
            name="taskType"
            className="check"
            value="Enhancement"
            id="Enhancement"
            checked={values.taskTypes.includes("Enhancement")}
            onChange={handleCheckbox}
          />
          <label htmlFor="Enhancement" className="check-label">Enhancement</label>
          <br />
          {errors.taskTypes && (
            <span className="error">
              <i className="fa-solid fa-triangle-exclamation" style={{ color: "#c0392b" }}></i>{" "}
              {errors.taskTypes}
            </span>
          )}
        </div>

        <div className="status">
          <label className="status-label">Status *</label>
          <br />
          <input
            type="radio"
            name="status"
            className="radio"
            value="Pending"
            id="Pending"
            checked={values.status === "Pending"}
            onChange={handleRadio}
          />
          <label htmlFor="Pending" className="radio-label">Pending</label>

          <input
            type="radio"
            name="status"
            className="radio in-progress-radio"
            value="In Progress"
            id="InProgress"
            checked={values.status === "In Progress"}
            onChange={handleRadio}
          />
          <label htmlFor="InProgress" className="radio-label in-progress-label">In Progress</label>
          <br />
          {errors.status && (
            <span className="error">
              <i className="fa-solid fa-triangle-exclamation" style={{ color: "#c0392b" }}></i>{" "}
              {errors.status}
            </span>
          )}
        </div>

        <div className="buttons">
          <button type="submit" id="create-button" className="create-button" disabled={submitting}>
            <span>✓</span> {submitting ? "Creating..." : "Create Task"}
          </button>
          <button type="reset" id="reset-button" className="reset-button">
            <span>✗</span> Reset
          </button>
        </div>
      </form>
    </section>
  );
}

export default TaskForm;
