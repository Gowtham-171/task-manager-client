import React, { useState } from "react";
import TaskCard from "./TaskCard";
import addTaskImage from "../../assets/images/add-task-image.png";
import noTaskImage from "../../assets/images/no-task-image.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSquareCheck} from "@fortawesome/free-solid-svg-icons";
import "./ActiveTasks.css";

const filters = ["all", "high", "medium", "low"];

function ActiveTasks({ tasks, loading, onCardClick, onEditClick, onDeleteClick }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const safeTasks = Array.isArray(tasks) ? tasks : [];

  const filtered =
    activeFilter === "all"
      ? safeTasks
      : safeTasks.filter(
          (task) => (task.priorityLevel ?? "").toLowerCase() === activeFilter
        );

  function countByPriority(p) {
    return safeTasks.filter((task) => (task.priorityLevel ?? "").toLowerCase() === p).length;
  }

  const showGlobalEmpty = safeTasks.length === 0;
  const showPriorityEmpty = !showGlobalEmpty && filtered.length === 0;

  return (
    <section className="active-task-section">
      <div className="task-card-heading">
        <div className="active-panel-title">
          <h3><FontAwesomeIcon icon={faSquareCheck} className="active-task-icon"/> Active Tasks</h3>
        </div>

        <div className="filter-buttons">
          {filters.map((f) => (
            <a
              key={f}
              className={`filter-button${activeFilter === f ? " active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {(f === "all" ? safeTasks.length : countByPriority(f)) > 0 && (
                <span>{" "}({f === "all" ? safeTasks.length : countByPriority(f)})</span>)}
            </a>
          ))}
        </div>
      </div>

      {loading && (
        <div className="empty-task">
          <h3>Loading Tasks...</h3>
        </div>
      )}

      {!loading && showGlobalEmpty && (
        <div className="empty-task">
          <div className="task-image">
            <img src={addTaskImage} alt="No tasks" />
          </div>
          <h3>No tasks yet</h3>
          <p>Start adding tasks and manage your work efficiently</p>
        </div>
      )}

      {!loading && !showGlobalEmpty && (
        <div className={`task-card-container${safeTasks.length > 4 ? " scroll" : ""}`}>
          {showPriorityEmpty ? (
            <div className="empty-task priority-empty">
              <div className="task-image">
                <img src={noTaskImage} alt="No tasks" />
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
              
              {[...filtered].reverse().map((task, index) => (
                <TaskCard
                  key={`${task.taskName}-${index}`}
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