import React, { useState, useEffect, useCallback } from "react";
import TaskForm from "../TaskForm/TaskForm";
import ActiveTasks from "../ActiveTasks/ActiveTasks";
import FullTaskPopup from "../FullTaskPopup/FullTaskPopup";
import EditPopup from "../EditPopup/EditPopup";
import DeletePopup from "../DeletePopup/DeletePopup";
import { getAllTasks, createTask, updateTask, deleteTask } from "../../utils/api";
import "./Dashboard.css";


function Dashboard({ onToast }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedTask, setSelectedTask] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getAllTasks();

      setTasks(Array.isArray(data.data) ? data.data : []); 
    } 
    catch (error) {
      console.error("Failed to fetch tasks:", error);
      setTasks([]);
    } 
    finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  function mapFormToPayload(formValues) {
    return {
      assigneeName:    formValues.username,
      taskName:        formValues.name,
      assigneeEmail:   formValues.email,
      dueDate:         formValues.date,
      dueTime:         formValues.time,
      priorityLevel:   formValues.priority,
      estimatedHours:  formValues.hours,
      projectUrl:      formValues.url,
      taskDescription: formValues.description,
      taskTypes:       formValues.taskTypes,
      taskStatus:      formValues.status,
      taskProgress : formValues.progress
    };
  }

  async function handleCreateTask(formValues) {
    await createTask(mapFormToPayload(formValues));

    await fetchTasks();

    onToast("Task Created Successfully");
  }

  async function handleUpdateTask(id, formValues) {
    await updateTask(id, mapFormToPayload(formValues));

    await fetchTasks();

    setEditTask(null);

    onToast("Task Updated Successfully");
  }

  async function handleDeleteConfirm() {
    if (!deleteTarget) return;
    await deleteTask(deleteTarget.id);
  
    await fetchTasks();

    setDeleteTarget(null);

    onToast("Task Deleted Successfully");
  }

  return (
    <>
      <div className="main-header">
        <h1 className="main-title">
          <span className="line"></span>Task Dashboard
        </h1>
      </div>

      <section className="main-section">
        <TaskForm tasks={tasks} onTaskCreated={handleCreateTask} />

        <ActiveTasks
          tasks={tasks}
          loading={loading}
          onCardClick={setSelectedTask}
          onEditClick={setEditTask}
          onDeleteClick={setDeleteTarget}
        />
      </section>

      {selectedTask && (
        <FullTaskPopup task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}

      {editTask && (
        <EditPopup
          task={editTask}
          tasks={tasks}
          onClose={() => setEditTask(null)}
          onUpdate={handleUpdateTask}
        />
      )}

      {deleteTarget && (
        <DeletePopup task={deleteTarget} onCancel={() => setDeleteTarget(null)} onConfirm={handleDeleteConfirm}/>
      )}
    </>
  );
}

export default Dashboard;