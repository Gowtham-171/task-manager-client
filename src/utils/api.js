const BASE_URL = "http://localhost:3000/api";

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const config = {
    headers: { "Content-Type": "application/json" },
    ...options,
  };

  const res = await fetch(url, config);
  
  const data = await res.json();
  
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export async function getAllTasks() {
  return request("/tasks");
}

export async function createTask(taskData) {
  return request("/tasks", {
    method: "POST",
    body: JSON.stringify(taskData),
  });
}

export async function updateTask(id, taskData) {
  return request(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(taskData),
  });
}

export async function deleteTask(id) {
  return request(`/tasks/${id}`, {
    method: "DELETE",
  });
}
