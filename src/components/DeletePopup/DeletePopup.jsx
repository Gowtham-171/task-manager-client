import React from "react";
import "./DeletePopup.css";

function DeletePopup({ task, onCancel, onConfirm }) {
  if (!task) return null;

  return (
    <>
      <div className="delete-overlay" onClick={onCancel}></div>
      <div className="delete-popup">
        <div className="icon">
          <i className="fa-solid fa-trash-can"></i>
        </div>
        <h2>Delete Task</h2>
        <p>
          <span id="delete-task-name">{task.name}</span>
          <br />
          will be deleted permanently
        </p>
        <div className="actions">
          <button className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirm-delete-button" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default DeletePopup;
