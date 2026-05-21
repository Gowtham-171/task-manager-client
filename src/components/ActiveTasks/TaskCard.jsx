import React from "react";
import { formatDisplayDate } from "../../utils/validators";
import calender from "../../assets/images/calendar-image.png";
import person from "../../assets/images/person-image.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {faSquareCheck} from "@fortawesome/free-solid-svg-icons";
import "./TaskCard.css";


function TaskCard({ task, onClick, onEdit, onDelete }) {
  const priorityClass = (task.priorityLevel ?? "").toLowerCase();
  const statusClass = (task.taskStatus ?? "").toLowerCase().replace(" ", "-");

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
        <h4>{task.taskName}</h4>
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

      <p>{task.taskDescription}</p>

      <p className="task-card-date">
        <img src={calender} alt="Calendar" />
        Due: {formatDisplayDate(task.dueDate)}
      </p>

      <p className="task-card-person">
        <img src={person} alt="Person" />
        {task.assigneeName}
      </p>

      <div className="priority-container">
        <label className={priorityClass}>
          <span>&#9679;</span>{task.priorityLevel}
        </label>
        <label className={`status-label-badge ${statusClass}`}>
          <small>&#9679;</small>{task.taskStatus}
        </label>
      </div>
    </div>
  );
}

export default TaskCard;