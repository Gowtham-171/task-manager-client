import React from "react";
import { formatDisplayDate } from "../../utils/validators";
import "./TaskCard.css";

function TaskCard({ task, onClick, onEdit, onDelete }) {
  const priorityClass = task.priority.toLowerCase();
  const statusClass = task.status.toLowerCase().replace(" ", "-");

  function handleCardClick(e) {
    if (e.target.closest(".edit-btn") || e.target.closest(".delete-btn")) return;
    onClick(task);
  }

  return (
    <div
      className={`task-card ${priorityClass}`}
      data-priority={priorityClass}
      data-status={statusClass}
      onClick={handleCardClick}
    >
      <div className="task-card-title">
        <h4>{task.name}</h4>
        <div className="task-actions">
          <span
            className="action-icon-outline edit-btn"
            onClick={(e) => { e.stopPropagation(); onEdit(task); }}
          >
            <i className="fas fa-edit"></i>
          </span>
          <span
            className="action-icon-outline delete-btn"
            onClick={(e) => { e.stopPropagation(); onDelete(task); }}
          >
            <i className="fa-solid fa-trash"></i>
          </span>
        </div>
      </div>

      <p>{task.description}</p>

      <p className="task-card-date">
        <img src="/images/Calendar-image.png" alt="Calendar" />
        Due: {formatDisplayDate(task.date)}
      </p>

      <p className="task-card-person">
        <img src="/images/Person-image.png" alt="Person" />
        {task.username}
      </p>

      <div className="priority-container">
        <label className={priorityClass}>
          <span>&#9679;</span>{task.priority}
        </label>
        <label className={`status-label-badge ${statusClass}`}>
          <small>&#9679;</small>{task.status}
        </label>
      </div>
    </div>
  );
}

export default TaskCard;
