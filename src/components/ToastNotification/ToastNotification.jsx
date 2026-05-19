import React, { useEffect } from "react";
import "./ToastNotification.css";

function Toast({ message, visible, onClose }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <div className={`toast${visible ? " show" : ""}`}>
      <span className="toast-icon">✓</span>
      <p className="toast-message">{message}</p>
      <i className="fa-solid fa-circle-xmark" onClick={onClose}></i>
    </div>
  );
}

export default Toast;
