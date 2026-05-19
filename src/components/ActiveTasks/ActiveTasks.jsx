import React, { useState } from "react";
import TaskCard from "./TaskCard";
import "./ActiveTasks.css";

const FILTERS = ["all", "high", "medium", "low"];

function ActiveTasks({ tasks, loading, onCardClick, onEditClick, onDeleteClick }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? tasks
      : tasks.filter((t) => t.priority.toLowerCase() === activeFilter);

  function countByPriority(p) {
    return tasks.filter((t) => t.priority.toLowerCase() === p).length;
  }

  const showGlobalEmpty = tasks.length === 0;
  const showPriorityEmpty = !showGlobalEmpty && filtered.length === 0;

  return (
    <section className="active-task-section">
      <div className="task-card-heading">
        <div className="active-panel-title">
          <h3>✅ Active Tasks</h3>
        </div>

        <div className="filter-buttons">
          {FILTERS.map((f) => (
            <a
              key={f}
              className={`filter-button${activeFilter === f ? " active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}{" "}
              <span>
                ({f === "all" ? tasks.length : countByPriority(f)})
              </span>
            </a>
          ))}
        </div>
      </div>

      {loading && (
        <div className="empty-task">
          <p>Loading tasks...</p>
        </div>
      )}

      {!loading && showGlobalEmpty && (
        <div className="empty-task">
          <div className="task-image">
            <img src="/images/Add-task-image.png" alt="No tasks" />
          </div>
          <h3>No tasks yet</h3>
          <p>Start adding tasks and manage your work efficiently</p>
        </div>
      )}

      {!loading && !showGlobalEmpty && (
        <div className={`task-card-container${tasks.length > 4 ? " scroll" : ""}`}>
          {showPriorityEmpty ? (
            <div className="empty-task priority-empty">
              <div className="task-image">
                <img src="/images/no-task-image.png" alt="No tasks" />
              </div>
              <h3>
                {activeFilter === "all"
                  ? "No Tasks"
                  : `No ${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Priority Tasks`}
              </h3>
              <p>Try adding a task or switch priority</p>
            </div>
          ) : (
            <div className="task-list">
              {[...filtered].reverse().map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onClick={onCardClick}
                  onEdit={onEditClick}
                  onDelete={onDeleteClick}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default ActiveTasks;
