export const userNameValidator = /^[A-Za-z\s.]+$/;
export const userPattern = /^(?:[A-Za-z]{3,})(?:[.\s][A-Za-z]+)*$/;
export const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
export const urlPattern = /^https?:\/\/[\w.-]+(\.[\w.-]+)+([/#?].*)?$/i;

export function validateTaskForm(values, existingTasks = [], editTaskId = null) {
  const errors = {};

  // Assignee Name
  if (!values.username || values.username.trim() === "") {
    errors.username = "Assignee Name is required";
  } else if (values.username.trim().length < 3) {
    errors.username = "Assignee Name must be at least 3 characters";
  } else if (!userNameValidator.test(values.username.trim())) {
    errors.username = "Assignee name cannot include numbers or special characters";
  } else if (
    values.username.trim().startsWith(".") ||
    values.username.trim().endsWith(".")
  ) {
    errors.username = "Assignee Name cannot start or end with a dot";
  } else if (!userPattern.test(values.username.trim())) {
    errors.username = "Invalid Assignee Name format";
  }

  // Task Name
  if (!values.name || values.name.trim() === "") {
    errors.name = "Task Name is required";
  } else if (!userNameValidator.test(values.name.trim())) {
    errors.name = "Task name cannot include numbers or special characters";
  } else {
    const tasks = Array.isArray(existingTasks) ? existingTasks : [];
    const duplicate = tasks.some(
      (t) =>
        t.name.toLowerCase() === values.name.trim().toLowerCase() &&
        t.id !== editTaskId
    );
    if (duplicate) errors.name = "Task Name already exists";
  }

  // Email
  if (!values.email || values.email.trim() === "") {
    errors.email = "Assignee Email is required";
  } else if (!values.email.includes("@")) {
    errors.email = "Email must include '@' symbol";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Please enter a valid email (e.g., name@email.com)";
  }

  // Due Date
  if (!values.date) {
    errors.date = "Due Date is required";
  }

  // Due Time
  if (!values.time) {
    errors.time = "Due Time is required";
  } else if (values.date === formattedTodayDate()) {
    if (values.time < formattedCurrentTime()) {
      errors.time = "Due Time cannot be in the past";
    }
  }

  // Priority 
  if (!values.priority) {
    errors.priority = "Priority Level is required";
  }

  // Estimated Hours
  if (!values.hours && values.hours !== 0) {
    errors.hours = "Estimated Hours are required";
  } else if (Number(values.hours) <= 0) {
    errors.hours = "Estimated Hours must be more than 0";
  }

  // Project URL
  if (!values.url || values.url.trim() === "") {
    errors.url = "Project URL is required";
  } else if (!/^https?:\/\//i.test(values.url.trim())) {
    errors.url = "Enter a valid URL starting with http:// or https://";
  } else if (!urlPattern.test(values.url.trim())) {
    errors.url = "Invalid URL";
  }

  // Description
  if (!values.description || values.description.trim() === "") {
    errors.description = "Task Description is required";
  } else if (values.description.trim().length < 3) {
    errors.description = "Task description must be at least 3 characters";
  }

  // Task Types
  if (!values.taskTypes || values.taskTypes.length === 0) {
    errors.taskTypes = "Please select at least one Task Type";
  }

  // Status
  if (!values.status) {
    errors.status = "Please select Task Status";
  }

  return errors;
}

export function formattedTodayDate() {
  return new Date().toISOString().split("T")[0];
}

export function formattedCurrentTime() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}

export function formatDisplayDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}