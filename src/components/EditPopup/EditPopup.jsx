import React, { useState, useEffect } from "react";
import { validateTaskForm, formattedTodayDate } from "../../utils/validators";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen } from "@fortawesome/free-solid-svg-icons";
import "./EditPopup.css";

const fieldOrder = [
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
  "status"
];

function EditPopup({ task, tasks, onClose, onUpdate }) {
  const [values, setValues] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (task) {
      setValues({
        username:  task.assigneeName || "",
        name:      task.taskName || "",
        email:     task.assigneeEmail || "",
        date:      task.dueDate || "",
        time:      task.dueTime || "",
        priority:  task.priorityLevel || "Low",
        hours:     task.estimatedHours ?? "", 
        url:       task.projectUrl || "",
        description: task.taskDescription || "",
        progress:  task.taskProgress ?? 0,
        taskTypes: Array.isArray(task.taskTypes) ? task.taskTypes : [],
        status:    task.taskStatus || "",
      });
      setErrors({});
      setServerError("");
    }
  }, [task?.id]);

  if (!task || !values) return null;

  function scrollToField(fieldKey) {
    const idMap = {
      username:    "taskUsername",
      name:        "taskName",
      email:       "taskEmail",
      date:        "taskDate",
      time:        "taskTime",
      priority:    "taskPriority",
      hours:       "taskHours",
      url:         "taskUrl",
      description: "taskDescription",
      taskTypes:   "taskTypesWrapper",
      status:      "statusWrapper"
    };

    const el = document.getElementById(idMap[fieldKey]);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "center" });

    if (["INPUT", "SELECT", "TEXTAREA"].includes(el.tagName)) {
      el.focus({ preventScroll: true });
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

  function handleProgress(e) {
    setValues((prev) => ({ ...prev, progress: Number(e.target.value) }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");

    const validationErrors = validateTaskForm(values, tasks, task.id);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorKey = fieldOrder.find((key) => validationErrors[key]);
      if (firstErrorKey) scrollToField(firstErrorKey);
      return;
    }

    try {
      setSubmitting(true);

      await onUpdate(task.id, values);

      onClose();
    } 
    catch (err) {
      setServerError(err.message || "Update failed. Please try again.");
    } 
    finally {
      setSubmitting(false);
    }
  }

  const today = formattedTodayDate();

  return (
    <section className="edit-popup">
      <div className="edit-popup-overlay"></div>

      <div className="edit-popup-box">
        <div className="edit-popup-border">

          <div className="edit-popup-header">
            <h3 className="edit-popup-title">
              <FontAwesomeIcon icon={faFilePen} /> Edit Task
            </h3>
            <button className="edit-popup-close" onClick={onClose} aria-label="Close">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <form className="edit-form" onSubmit={handleSubmit}>
            <div className="edit-popup-scroll">

              {/* Assignee Name */}
              <div className="input-username">
                <label className="float-label">Assignee Name</label>
                <input
                  type="text"
                  name="username"
                  id="taskUsername"
                  placeholder="Assignee Name *"
                  value={values.username}
                  onChange={handleChange}
                  style={errors.username ? { borderColor: "red" } : {}}
                />
                {errors.username && (
                  <span className="error">
                    <i className="fa-solid fa-triangle-exclamation" style={{ color: "#c0392b" }}></i> {errors.username}
                  </span>
                )}
              </div>

              {/* Task Name */}
              <div className="input-name">
                <label className="float-label">Task Name</label>
                <input
                  type="text"
                  name="name"
                  id="taskName"
                  placeholder="Task Name *"
                  value={values.name}
                  onChange={handleChange}
                  style={errors.name ? { borderColor: "red" } : {}}
                />
                {errors.name && (
                  <span className="error">
                    <i className="fa-solid fa-triangle-exclamation" style={{ color: "#c0392b" }}></i> {errors.name}
                  </span>
                )}
              </div>

              {/* Assignee Email */}
              <div className="input-email">
                <label className="float-label">Assignee Email</label>
                <input
                  type="text"
                  name="email"
                  id="taskEmail"
                  placeholder="Assignee Email *"
                  value={values.email}
                  onChange={handleChange}
                  style={errors.email ? { borderColor: "red" } : {}}
                />
                {errors.email && (
                  <span className="error">
                    <i className="fa-solid fa-triangle-exclamation" style={{ color: "#c0392b" }}></i> {errors.email}
                  </span>
                )}
              </div>

              {/* Due Date & Time */}
              <div className="edit-row">
                <div className="input-date">
                  <label className="float-label">Due Date</label>
                  <input
                    type="date"
                    name="date"
                    id="taskDate"
                    min={today}
                    value={values.date}
                    onChange={handleChange}
                    style={errors.date ? { borderColor: "red" } : {}}
                  />
                  {errors.date && (
                    <span className="error">
                      <i className="fa-solid fa-triangle-exclamation" style={{ color: "#c0392b" }}></i> {errors.date}
                    </span>
                  )}
                </div>

                <div className="input-time">
                  <label className="float-label">Due Time</label>
                  <input
                    type="time"
                    name="time"
                    id="taskTime"
                    value={values.time}
                    onChange={handleChange}
                    style={errors.time ? { borderColor: "red" } : {}}
                  />
                  {errors.time && (
                    <span className="error">
                      <i className="fa-solid fa-triangle-exclamation" style={{ color: "#c0392b" }}></i> {errors.time}
                    </span>
                  )}
                </div>
              </div>

              {/* Priority & Hours */}
              <div className="edit-row">
                <div className="select-priority">
                  <label className="float-label">Priority</label>
                  <select
                    name="priority"
                    id="taskPriority"
                    value={values.priority}
                    onChange={handleChange}
                  >
                    <option value="Low">Low Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="High">High Priority</option>
                  </select>
                  {errors.priority && (
                    <span className="error">{errors.priority}</span>
                  )}
                </div>

                <div className="input-hours">
                  <label className="float-label">Estimated Hours</label>
                  <input
                    type="number"
                    name="hours"
                    id="taskHours"
                    placeholder="0"
                    value={values.hours}
                    onChange={handleChange}
                    onKeyDown={(e) =>
                      ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()
                    }
                    style={errors.hours ? { borderColor: "red" } : {}}
                  />
                  {errors.hours && (
                    <span className="error">
                      <i className="fa-solid fa-triangle-exclamation" style={{ color: "#c0392b" }}></i> {errors.hours}
                    </span>
                  )}
                </div>
              </div>

              {/* Project URL */}
              <div className="project-url">
                <label className="float-label">Project URL</label>
                <input
                  type="text"
                  name="url"
                  id="taskUrl"
                  placeholder="Project URL *"
                  value={values.url}
                  onChange={handleChange}
                  style={errors.url ? { borderColor: "red" } : {}}
                />
                {errors.url && (
                  <span className="error">
                    <i className="fa-solid fa-triangle-exclamation" style={{ color: "#c0392b" }}></i> {errors.url}
                  </span>
                )}
              </div>

              {/* Task Description */}
              <div className="task-description">
                <label className="float-label">Task Description</label>
                <textarea
                  name="description"
                  id="taskDescription"
                  placeholder="Task Description *"
                  value={values.description}
                  onChange={handleChange}
                  style={errors.description ? { borderColor: "red" } : {}}
                ></textarea>
                {errors.description && (
                  <span className="error">
                    <i className="fa-solid fa-triangle-exclamation" style={{ color: "#c0392b" }}></i> {errors.description}
                  </span>
                )}
              </div>

              {/* Task Progress */}
              <div className="task-progress">
                <label className="float-label">Task Progress</label>
                <input
                  type="range"
                  id="taskProgress"
                  className="input-range"
                  name="progress"
                  min="0"
                  max="100"
                  value={values.progress}
                  onChange={handleProgress}
                />
                <p className="task-progress-label">{values.progress}%</p>
              </div>

              {/* Task Types */}
              <div className="task-types" id="taskTypesWrapper">
                <label className="float-label">Task Type</label>
                <div className="options-grid">
                  {["Bug", "Feature", "Enhancement"].map((type) => (
                    <label className="option" key={type}>
                      <input
                        type="checkbox"
                        name="taskType"
                        className="edit-check"
                        value={type}
                        checked={values.taskTypes.includes(type)}
                        onChange={handleCheckbox}
                      />
                      <span>{type === "Bug" ? "Bug Fix" : type}</span>
                    </label>
                  ))}
                </div>
                {errors.taskTypes && (
                  <span className="error edit-check-error">
                    <i className="fa-solid fa-triangle-exclamation" style={{ color: "#c0392b" }}></i> {errors.taskTypes}
                  </span>
                )}
              </div>

              {/* Status */}
              <div className="status" id="statusWrapper">
                <label className="float-label">Status</label>
                <div className="options-grid">
                  {["Pending", "In-Progress", "Completed"].map((s) => (
                    <label className="option" key={s}>
                      <input
                        type="radio"
                        name="edit-status"
                        className="edit-radio"
                        value={s}
                        checked={values.status === s}
                        onChange={handleRadio}
                      />
                      <span>{s}</span>
                    </label>
                  ))}
                </div>
                {errors.status && (
                  <span className="error">{errors.status}</span>
                )}
              </div>

              {/* Server Error */}
              {serverError && (
                <span className="error">
                  <i className="fa-solid fa-triangle-exclamation" style={{ color: "#c0392b" }}></i> {serverError}
                </span>
              )}

            </div>

            <div className="edit-popup-buttons">
              <button type="submit" className="button primary" disabled={submitting}>
                {submitting ? "Updating..." : "Update Task"}
              </button>
              <button type="button" className="button cancel" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
}

export default EditPopup;