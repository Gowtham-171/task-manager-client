import React from "react";
import { formatDisplayDate } from "../../utils/validators";
import "./FullTaskPopup.css";

function FullTaskPopup({ task, onClose }) {
  if (!task) return null;

  const priorityClass = task.priorityLevel?.toLowerCase();
  const statusClass = task.taskStatus?.toLowerCase().replace(" ", "-");

  const initials = task.assigneeName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const taskTypes = Array.isArray(task.taskTypes)
    ? task.taskTypes
    : task.taskTypes
    ? [task.taskTypes]
    : [];

  return (
    <section className="fulltask-popup">
      <div className="fulltask-popup-overlay" onClick={onClose}></div>

      <div className="fulltask-popup-box">
        <div className="fulltask-popup-border">

          <div className="fulltask-popup-header">
            <h3 className="fulltask-popup-title">{task.taskName}</h3>
            <button className="fulltask-popup-close" onClick={onClose} aria-label="Close">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="fulltask-popup-scroll">
            <p className="fulltask-popup-description">{task.taskDescription}</p>

            <div className="fulltask-popup-body">
              <div className="fulltask-popup-main">

                <span className="fulltask-popup-label">Assigned to</span>
                <div className="fulltask-popup-assignee">
                  <div className="fulltask-popup-avatar">{initials}</div>
                  <div className="fulltask-popup-assignee-info">
                    <div className="fulltask-popup-assignee-name">{task.assigneeName}</div>
                    <div className="fulltask-popup-assignee-email">{task.assigneeEmail}</div>
                  </div>
                </div>

                <span className="fulltask-popup-label">Task Progress</span>
                <div className="fulltask-popup-progress">
                  <div className="fulltask-popup-progress-top">
                    <span className="fulltask-popup-progress-text">Completion</span>
                    <span className="fulltask-popup-progress-percent">{task.taskProgress || 0}%</span>
                  </div>
                  <div className="fulltask-popup-progress-range">
                    <div
                      className="fulltask-popup-progress-fill"
                      style={{ width: `${task.taskProgress || 0}%` }}
                    ></div>
                  </div>
                </div>

                <div className="fulltask-popup-row">
                  <div className="fulltask-popup-group">
                    <span className="fulltask-popup-label">Priority Level</span>
                    <div className="fulltask-popup-items">
                      <span className={`fulltask-popup-item priority ${priorityClass}`}>
                        <i className="fa-solid fa-circle" style={{ fontSize: "7px" }}></i>
                        {task.priorityLevel}
                      </span>
                    </div>
                  </div>

                  <div className="fulltask-popup-group">
                    <span className="fulltask-popup-label">Status</span>
                    <div className="fulltask-popup-itmes">
                      <span className={`fulltask-popup-item status ${statusClass}`}>
                        <i className="fa-solid fa-circle" style={{ fontSize: "7px" }}></i>
                        {task.taskStatus}
                      </span>
                    </div>
                  </div>

                  <div className="fulltask-popup-group">
                    <span className="fulltask-popup-label">Task Type</span>
                    <div className="fulltask-popup-items">
                      {taskTypes.map((t) => (
                        <span key={t} className="fulltask-popup-item">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              <div className="fulltask-popup-sidebar">
                <div className="fulltask-popup-sidebar-label">Details</div>

                <div className="fulltask-popup-detail-item">
                  <div className="fulltask-popup-detail-icon">
                    <i className="fa-regular fa-calendar"></i>
                  </div>
                  <div className="fulltask-popup-detail-text">
                    <span className="fulltask-popup-detail-key">Due date</span>
                    <span className="fulltask-popup-detail-val">{formatDisplayDate(task.dueDate)}</span>
                  </div>
                </div>

                <div className="fulltask-popup-detail-item">
                  <div className="fulltask-popup-detail-icon">
                    <i className="fa-regular fa-clock"></i>
                  </div>
                  <div className="fulltask-popup-detail-text">
                    <span className="fulltask-popup-detail-key">Due time</span>
                    <span className="fulltask-popup-detail-val">{task.dueTime}</span>
                  </div>
                </div>

                <div className="fulltask-popup-detail-item">
                  <div className="fulltask-popup-detail-icon">
                    <i className="fa-regular fa-hourglass"></i>
                  </div>
                  <div className="fulltask-popup-detail-text">
                    <span className="fulltask-popup-detail-key">Estimated hours</span>
                    <span className="fulltask-popup-detail-val">{task.estimatedHours} hrs</span>
                  </div>
                </div>

                {task.projectUrl && (
                  <div className="fulltask-popup-detail-item">
                    <div className="fulltask-popup-detail-icon">
                      <i className="fa-solid fa-link"></i>
                    </div>
                    <div className="fulltask-popup-detail-text">
                      <span className="fulltask-popup-detail-key">Project URL</span>
                      
                      <a className="fulltask-popup-detail-link"
                        href={task.projectUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View project ↗
                      </a>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default FullTaskPopup;