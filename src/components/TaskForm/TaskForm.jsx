import React, { useState, useRef } from "react";
import { validateTaskForm, formattedTodayDate } from "../../utils/validators";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFilePen} from "@fortawesome/free-solid-svg-icons";
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

const FIELD_ORDER = [
  "username",
  "name",
  "email",
  "date",
  "time",
  "priority",
  "hours",
  "url",
  "description",
  "taskTypes",
  "status",
];

function TaskForm({ tasks, onTaskCreated }) {
  const [values, setValues] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const fieldRefs = useRef(
    Object.fromEntries(FIELD_ORDER.map((key) => [key, React.createRef()]))
  );

  function scrollToField(fieldKey) {
    const wrapperEl = fieldRefs.current[fieldKey]?.current;
    if (wrapperEl) {
      wrapperEl.scrollIntoView({ behavior: "smooth", block: "center" });
      const focusable = wrapperEl.querySelector("input, select, textarea");
      if (focusable) focusable.focus({ preventScroll: true });
    }
  }

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
    const validationErrors = validateTaskForm(values, tasks || []);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorKey = FIELD_ORDER.find((key) => validationErrors[key]);
      if (firstErrorKey) scrollToField(firstErrorKey);
      return;
    }

    try {
      setSubmitting(true);

      await onTaskCreated(values);

      setValues(INITIAL_STATE);
      
      setErrors({});
    } 
    catch (err) {
      const message = err.message || "";
      let backendErrors = {};

      if (message.toLowerCase().includes("task name")) {
        backendErrors = { name: "Task name already exists" };
      } else if (
        message.toLowerCase().includes("assignee name") ||
        message.toLowerCase().includes("assigneename")
      ) {
        backendErrors = { username: message };
      } else if (message.toLowerCase().includes("email")) {
        backendErrors = { email: message };
      } else if (
        message.toLowerCase().includes("due date") ||
        message.toLowerCase().includes("duedate")
      ) {
        backendErrors = { date: message };
      } else if (
        message.toLowerCase().includes("due time") ||
        message.toLowerCase().includes("duetime")
      ) {
        backendErrors = { time: message };
      } else if (message.toLowerCase().includes("priority")) {
        backendErrors = { priority: message };
      } else if (message.toLowerCase().includes("hour")) {
        backendErrors = { hours: message };
      } else if (message.toLowerCase().includes("url")) {
        backendErrors = { url: message };
      } else if (message.toLowerCase().includes("description")) {
        backendErrors = { description: message };
      } else if (message.toLowerCase().includes("task type")) {
        backendErrors = { taskTypes: message };
      } else if (message.toLowerCase().includes("status")) {
        backendErrors = { status: message };
      } else {
        backendErrors = { name: message };
      }

      setErrors(backendErrors);
      const firstErrorKey = FIELD_ORDER.find((key) => backendErrors[key]);
      if (firstErrorKey) scrollToField(firstErrorKey);
    } 
    finally {
      setSubmitting(false);
    }
  }

  function handleReset() {
    setValues(INITIAL_STATE);
    setErrors({});
  }

  const today = formattedTodayDate();

  const firstErrorKey = FIELD_ORDER.find((key) => errors[key]);

  return (
    <section className="task-panel-section">
      <div className="task-panel-title">
        <h3><FontAwesomeIcon icon={faFilePen} className="create-task-icon"/> Create New Task</h3>
      </div>

      <form id="form" onSubmit={handleSubmit} onReset={handleReset}>

        {/* Assignee Name */}
        <div className="input-username" ref={fieldRefs.current.username}>
          <input
            type="text"
            name="username"
            className="username"
            placeholder="Assignee Name *"
            value={values.username}
            onChange={handleChange}
            style={firstErrorKey === "username" ? { borderColor: "red" } : {}}
          />
          {firstErrorKey === "username" && errors.username && (
            <span className="error">
              <i className="fa-solid fa-triangle-exclamation" style={{ color: "#c0392b" }}></i>{" "}
              {errors.username}
            </span>
          )}
        </div>

        {/* Task Name */}
        <div className="input-name" ref={fieldRefs.current.name}>
          <input
            type="text"
            name="name"
            className="name"
            placeholder="Task Name *"
            value={values.name}
            onChange={handleChange}
            style={firstErrorKey === "name" ? { borderColor: "red" } : {}}
          />
          {firstErrorKey === "name" && errors.name && (
            <span className="error">
              <i className="fa-solid fa-triangle-exclamation" style={{ color: "#c0392b" }}></i>{" "}
              {errors.name}
            </span>
          )}
        </div>

        {/* Assignee Email */}
        <div className="input-email" ref={fieldRefs.current.email}>
          <input
            type="text"
            name="email"
            className="email"
            placeholder="Assignee Email *"
            value={values.email}
            onChange={handleChange}
            style={firstErrorKey === "email" ? { borderColor: "red" } : {}}
          />
          {firstErrorKey === "email" && errors.email && (
            <span className="error">
              <i className="fa-solid fa-triangle-exclamation" style={{ color: "#c0392b" }}></i>{" "}
              {errors.email}
            </span>
          )}
        </div>

        {/* Due Date */}
        <div className="input-date" ref={fieldRefs.current.date}>
          <label className="float-label" htmlFor="date-input">Due Date *</label>
          <input
            type="date"
            name="date"
            id="date-input"
            className="date"
            min={today}
            value={values.date}
            onChange={handleChange}
            style={firstErrorKey === "date" ? { borderColor: "red" } : {}}
          />
          {firstErrorKey === "date" && errors.date && (
            <span className="error">
              <i className="fa-solid fa-triangle-exclamation" style={{ color: "#c0392b" }}></i>{" "}
              {errors.date}
            </span>
          )}
        </div>

        {/* Due Time */}
        <div className="input-time" ref={fieldRefs.current.time}>
          <label className="float-label" htmlFor="time-input">Due Time *</label>
          <input
            type="time"
            name="time"
            id="time-input"
            className="time"
            value={values.time}
            onChange={handleChange}
            style={firstErrorKey === "time" ? { borderColor: "red" } : {}}
          />
          {firstErrorKey === "time" && errors.time && (
            <span className="error">
              <i className="fa-solid fa-triangle-exclamation" style={{ color: "#c0392b" }}></i>{" "}
              {errors.time}
            </span>
          )}
        </div>

        {/* Priority Level */}
        <div className="select-priority" ref={fieldRefs.current.priority}>
          <label className="float-label" htmlFor="priority-select">Priority Level *</label>
          <select
            name="priority"
            id="priority-select"
            className="priority-selection"
            value={values.priority}
            onChange={handleChange}
            style={firstErrorKey === "priority" ? { borderColor: "red" } : {}}
          >
            <option value="" disabled>-- Select priority --</option>
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
          {firstErrorKey === "priority" && errors.priority && (
            <span className="error">
              <i className="fa-solid fa-triangle-exclamation" style={{ color: "#c0392b" }}></i>{" "}
              {errors.priority}
            </span>
          )}
        </div>

        {/* Estimated Hours */}
        <div className="input-hours" ref={fieldRefs.current.hours}>
          <label className="float-label float-Hours" htmlFor="hours-input">Estimated Hours *</label>
          <input
            type="number"
            name="hours"
            id="hours-input"
            className="number"
            placeholder="0"
            value={values.hours}
            onChange={handleChange}
            onKeyDown={(e) =>
              ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()
            }
            style={firstErrorKey === "hours" ? { borderColor: "red" } : {}}
          />
          {firstErrorKey === "hours" && errors.hours && (
            <span className="error">
              <i className="fa-solid fa-triangle-exclamation" style={{ color: "#c0392b" }}></i>{" "}
              {errors.hours}
            </span>
          )}
        </div>

        {/* Project URL */}
        <div className="project-url" ref={fieldRefs.current.url}>
          <input
            type="text"
            name="url"
            placeholder="Project URL *"
            value={values.url}
            onChange={handleChange}
            style={firstErrorKey === "url" ? { borderColor: "red" } : {}}
          />
          {firstErrorKey === "url" && errors.url && (
            <span className="error">
              <i className="fa-solid fa-triangle-exclamation" style={{ color: "#c0392b" }}></i>{" "}
              {errors.url}
            </span>
          )}
        </div>

        {/* Task Description */}
        <div className="task-description" ref={fieldRefs.current.description}>
          <textarea
            name="description"
            placeholder="Task-Description *"
            value={values.description}
            onChange={handleChange}
            style={firstErrorKey === "description" ? { borderColor: "red" } : {}}
          ></textarea>
          {firstErrorKey === "description" && errors.description && (
            <span className="error">
              <i className="fa-solid fa-triangle-exclamation" style={{ color: "#c0392b" }}></i>{" "}
              {errors.description}
            </span>
          )}
        </div>

        {/* Task Type (checkboxes) */}
        <div className="task-type" ref={fieldRefs.current.taskTypes}>
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
          {firstErrorKey === "taskTypes" && errors.taskTypes && (
            <span className="error">
              <i className="fa-solid fa-triangle-exclamation" style={{ color: "#c0392b" }}></i>{" "}
              {errors.taskTypes}
            </span>
          )}
        </div>

        {/* Status (radio) */}
        <div className="status" ref={fieldRefs.current.status}>
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
            value="In-Progress"
            id="InProgress"
            checked={values.status === "In-Progress"}
            onChange={handleRadio}
          />
          <label htmlFor="InProgress" className="radio-label in-progress-label">In Progress</label>
          <br />
          {firstErrorKey === "status" && errors.status && (
            <span className="error">
              <i className="fa-solid fa-triangle-exclamation" style={{ color: "#c0392b" }}></i>{" "}
              {errors.status}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="buttons">
          <button type="submit" id="create-button" className="create-button" disabled={submitting}>
            <span>&#10003;</span> {submitting ? "Creating..." : "Create Task"}
          </button>

          <button type="reset" id="reset-button" className="reset-button">
            <span>&#10006;</span><br />Reset
          </button>
        </div>
      </form>
    </section>
  );
}

export default TaskForm;