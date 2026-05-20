import React from "react";
import { formatDisplayDate } from "../../utils/validators";
import "./FullTaskPopup.css";

function FullTaskPopup({ task, onClose }) {
  if (!task) return null;
  // console.log(task);

  const priorityClass = task.priorityLevel.toLowerCase();
  const statusClass = task.taskStatus.toLowerCase().replace(" ", "-");

  return (
    <section className="fulltask-popup" style={{ display: "flex" }}>
      <div className="full-task-overlay" onClick={onClose}></div>

      <div className="full-task-card">
        <div className="full-task-card-border">
          <div className="full-taskcard-datas">
            <button className="popup-close" onClick={onClose}>
              <i className="fa-solid fa-xmark"></i>
            </button>

            <h3 className="task-title">{task.taskName}</h3>

            <div className="fulltask-popup-body">
              <p className="task-desc">{task.taskDescription}</p>

              <div className="full-taskcard-grid">
                <div className="grid-item">
                  <span className="label">👤 User</span>
                  <span className="colon">:</span>
                  <span className="value">{task.assigneeName}</span>
                </div>
                <div className="grid-item">
                  <span className="label">📧 Email</span>
                  <span className="colon">:</span>
                  <span className="value">{task.assigneeEmail}</span>
                </div>
                <div className="grid-item">
                  <span className="label">📅 Due Date</span>
                  <span className="colon">:</span>
                  <span className="value">{formatDisplayDate(task.dueDate)}</span>
                </div>
                <div className="grid-item">
                  <span className="label">⏰ Due Time</span>
                  <span className="colon">:</span>
                  <span className="value">{task.dueTime}</span>
                </div>
                <div className="grid-item">
                  <span className="label">⏳ Estimated Hours</span>
                  <span className="colon">:</span>
                  <span className="value">{task.estimatedHours} Hours</span>
                </div>
                <div className="grid-item">
                  <span className="label">🔗 Project URL</span>
                  <span className="colon">:</span>
                  <a
                    className="value link"
                    href={task.projectUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Project
                  </a>
                </div>
              </div>

              <div className="progress-section">
                <div className="progress-label">
                  <span>Progress</span>
                  <span className="value">{task.taskProgress || 0}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${task.taskProgress || 0}%` }}
                  ></div>
                </div>
              </div>

              <div className="priority-container">
                <label className={priorityClass}>
                  <span>&#9679;</span>{task.priorityLevel}
                </label>
                <span className="badge type">
                  {Array.isArray(task.taskTypes)
                    ? task.taskTypes.join(", ")
                    : task.taskTypes}
                </span>
                <label className={`status-popup ${statusClass}`}>
                  <small>&#9679;</small>{task.taskStatus}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FullTaskPopup;
