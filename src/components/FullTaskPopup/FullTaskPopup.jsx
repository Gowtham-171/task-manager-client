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
    <section className="ftp-overlay">
      <div className="ftp-backdrop" onClick={onClose}></div>

      <div className="ftp-modal">
        <div className="ftp-modal-header">
          <h3 className="ftp-title">{task.taskName}</h3>
          <button className="ftp-close" onClick={onClose} aria-label="Close">
            &#x2715;
          </button>
        </div>

        <div className="ftp-body">
          <div className="ftp-main">

            <p className="ftp-desc">{task.taskDescription}</p>

            <div className="ftp-section-label">Progress</div>
            <div className="ftp-progress-block">
              <div className="ftp-progress-top">
                <span className="ftp-progress-sub">Completion</span>
                <span className="ftp-progress-pct">{task.taskProgress || 0}%</span>
              </div>
              <div className="ftp-progress-track">
                <div
                  className="ftp-progress-fill"
                  style={{ width: `${task.taskProgress || 0}%` }}
                ></div>
              </div>
            </div>

            <div className="ftp-section-label">Assigned to</div>
            <div className="ftp-assignee">
              <div className="ftp-avatar">{initials}</div>
              <div className="ftp-assignee-info">
                <div className="ftp-assignee-name">{task.assigneeName}</div>
                <div className="ftp-assignee-email">{task.assigneeEmail}</div>
              </div>
            </div>

            <div className="ftp-meta-row">

              <div className="ftp-meta-group">
                <span className="ftp-section-label">Task type</span>
                <div className="ftp-chips">
                  {taskTypes.map((t) => (
                    <span key={t} className="ftp-chip">{t}</span>
                  ))}
                </div>
              </div>

              <div className="ftp-meta-group">
                <span className="ftp-section-label">Priority</span>
                <div className="ftp-chips">
                  <span className={`ftp-chip ftp-priority ${priorityClass}`}>
                    <i className="fa-solid fa-circle" style={{ fontSize: "7px" }}></i>
                    {task.priorityLevel}
                  </span>
                </div>
              </div>

              <div className="ftp-meta-group">
                <span className="ftp-section-label">Status</span>
                <div className="ftp-chips">
                  <span className={`ftp-chip ftp-status ${statusClass}`}>
                    <i className="fa-solid fa-circle" style={{ fontSize: "7px" }}></i>
                    {task.taskStatus}
                  </span>
                </div>
              </div>

            </div>

          </div>

          <div className="ftp-sidebar">
            <div className="ftp-sidebar-label">Details</div>

            <div className="ftp-detail-item">
              <div className="ftp-detail-icon">
                <i className="fa-regular fa-calendar"></i>
              </div>
              <div className="ftp-detail-text">
                <span className="ftp-detail-key">Due date</span>
                <span className="ftp-detail-val">{formatDisplayDate(task.dueDate)}</span>
              </div>
            </div>

            <div className="ftp-detail-item">
              <div className="ftp-detail-icon">
                <i className="fa-regular fa-clock"></i>
              </div>
              <div className="ftp-detail-text">
                <span className="ftp-detail-key">Due time</span>
                <span className="ftp-detail-val">{task.dueTime}</span>
              </div>
            </div>

            <div className="ftp-detail-item">
              <div className="ftp-detail-icon">
                <i className="fa-regular fa-hourglass"></i>
              </div>
              <div className="ftp-detail-text">
                <span className="ftp-detail-key">Estimated hours</span>
                <span className="ftp-detail-val">{task.estimatedHours} hrs</span>
              </div>
            </div>

            {task.projectUrl && (
              <div className="ftp-detail-item">
                <div className="ftp-detail-icon">
                  <i className="fa-solid fa-link"></i>
                </div>
                <div className="ftp-detail-text">
                  <span className="ftp-detail-key">Project URL</span>
                  <a
                    className="ftp-detail-link"
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
    </section>
  );
}

export default FullTaskPopup;