import React from 'react';
import TaskForm from '../TaskForm/TaskForm';
// import TaskList from '../TaskList/TaskList';
import './Dashboard.css';

function Dashboard({ tasks, saveTasks, showToast, navigate }) {
  return (
    <section className="main-section">
      <TaskForm tasks={tasks} saveTasks={saveTasks} showToast={showToast} />
      {/* <TaskList
        tasks={tasks}
        saveTasks={saveTasks}
        showToast={showToast}
        isTasksPage={false}
        navigate={navigate}
      /> */}
    </section>
  );
}

export default Dashboard;
